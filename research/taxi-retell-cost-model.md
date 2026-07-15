# Taxi AI Receptionist — Retell Cost Model

Date checked: 2026-07-15.

## Verified Retell rules

- Voice engine starts around `$0.07/min` depending on voice.
- Knowledge-base usage is a flat `$0.005/min` for calls with KB enabled.
- The first 10 knowledge bases are free; additional KBs are `$8/month` each.
- It does not matter whether one or several KBs are attached: KB usage remains `$0.005/min`.
- Retell retrieves relevant chunks rather than injecting the entire stored KB. Default guidance is 3 chunks with a 0.60 similarity threshold.
- If the active LLM prompt exceeds 4,000 tokens, Retell scales billed duration by `active prompt tokens / 4,000`.
- Customer-owned SIP removes Retell-managed number/telephony charges, but the customer's SIP carrier may still charge separately.
- Pay-as-you-go workspaces start at 20 concurrent calls. Burst calls above the normal limit add `$0.10/min` for the full call.

## Important conclusion about a large KB

Stored KB size by itself does not change the `$0.005/min` KB fee. A 5-page and 500-page KB cost the same per call minute. The cost risk comes from retrieving too many or overly large chunks, long agent instructions, verbose tool definitions/results, and growing call transcripts pushing active context above 4,000 tokens.

## Planning scenarios with customer-owned SIP

These are planning estimates; confirm the exact selected voice and LLM in Retell's dashboard before quoting the customer.

| Scenario | Voice engine | LLM allowance | KB | Retell cost/min | 20% safety budget |
|---|---:|---:|---:|---:|---:|
| Lean dispatch | $0.070 | $0.006 | $0.005 | $0.081 | $0.097 |
| Standard quality | $0.070 | $0.045 | $0.005 | $0.120 | $0.144 |
| Premium configuration | $0.080 | $0.050 | $0.005 | $0.135 | $0.162 |

Excluded: SIP carrier charges, integration hosting, maps/geocoding, SMS, payment fees, human transfers, burst concurrency, support/maintenance, tax, and sales margin.

## Example monthly Retell spend

Using the standard-quality `$0.120/min` planning cost:

| Connected minutes/month | Estimated Retell cost |
|---:|---:|
| 5,000 | $600 |
| 10,000 | $1,200 |
| 25,000 | $3,000 |
| 50,000 | $6,000 |
| 100,000 | $12,000 |

24/7 availability does not mean paying for every minute in the month. Retell charges connected call usage, subject to its billing exceptions.

## Recommended production design

- Keep stable policies, service descriptions, accessibility rules, FAQs, and escalation rules in the KB.
- Use live tools/APIs for fare quotations, ETA, driver availability, booking creation, booking status, flight status, promotions, and corporate-account eligibility.
- Start with 3 retrieved chunks and 0.60 similarity.
- Keep the operational agent prompt below 4,000 active tokens where possible.
- Measure actual `call_cost` and `llm_token_usage` from Retell call records during a pilot before fixing the commercial price.
- Quote the taxi company from observed P50/P95 cost per connected minute, then add SIP, infrastructure, support, risk reserve, and margin.

## Official sources

- https://docs.retellai.com/build/knowledge-base
- https://docs.retellai.com/accounts/billing-exceptions.md
- https://docs.retellai.com/deploy/concurrency
- https://www.retellai.com/pricing
