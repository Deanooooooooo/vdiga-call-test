type LeadRecord = {
  id?: string;
  contact_name?: string | null;
  business_name?: string | null;
  phone?: string | null;
  email?: string | null;
  primary_need?: string | null;
  primary_need_label?: string | null;
  current_call_problem?: string | null;
  selected_plan?: string | null;
  billing_period?: string | null;
  source_path?: string | null;
  created_at?: string | null;
};

type DatabaseWebhookPayload = {
  type?: string;
  table?: string;
  record?: LeadRecord;
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const clean = (value: unknown, fallback = "-") => {
  const text = String(value ?? "").trim();
  return text || fallback;
};

const escapeHtml = (value: unknown) =>
  clean(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const formatBillingPeriod = (value: unknown) => {
  if (value === "monthly") return "Месечно";
  if (value === "annual") return "Годишно";
  return "-";
};

const formatLeadMessage = (lead: LeadRecord) => {
  const lines = [
    "<b>🟢 Нов Vdiga lead</b>",
    "",
    "<b>Клиент</b>",
    "━━━━━━━━━━━━",
    `<b>Име:</b> ${escapeHtml(lead.contact_name)}`,
    `<b>Бизнес:</b> ${escapeHtml(lead.business_name)}`,
    `<b>Телефон:</b> ${escapeHtml(lead.phone)}`,
    `<b>Имейл:</b> ${escapeHtml(lead.email)}`,
    "",
    "<b>Заявка</b>",
    "━━━━━━━━━━━━",
    `<b>Нужда:</b> ${escapeHtml(lead.primary_need_label ?? lead.primary_need)}`,
    `<b>План:</b> ${escapeHtml(lead.selected_plan)}`,
    `<b>Плащане:</b> ${escapeHtml(formatBillingPeriod(lead.billing_period))}`,
    `<b>Страница:</b> ${escapeHtml(lead.source_path)}`,
  ];

  if (lead.current_call_problem) {
    lines.push("", "<b>Съобщение</b>", "━━━━━━━━━━━━", escapeHtml(lead.current_call_problem));
  }

  return lines.join("\n");
};

const sendTelegramMessage = async (text: string) => {
  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

  if (!botToken || !chatId) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendMessage failed: ${response.status} ${body}`);
  }
};

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const expectedSecret = Deno.env.get("LEAD_WEBHOOK_SECRET");
  if (!expectedSecret) {
    console.error("Missing LEAD_WEBHOOK_SECRET");
    return jsonResponse({ error: "Notification webhook is not configured" }, 500);
  }

  const providedSecret = request.headers.get("x-lead-webhook-secret");
  if (providedSecret !== expectedSecret) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  let payload: DatabaseWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const lead = payload.record;
  if (!lead) {
    return jsonResponse({ error: "Missing webhook record" }, 400);
  }

  try {
    await sendTelegramMessage(formatLeadMessage(lead));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown notification error";
    console.error(message);
    return jsonResponse({ error: message }, 502);
  }

  return jsonResponse({ ok: true });
});
