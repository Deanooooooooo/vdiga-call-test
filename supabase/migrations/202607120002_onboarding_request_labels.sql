alter table public.onboarding_requests
  add column if not exists primary_need_label text;

update public.onboarding_requests
set primary_need_label = case primary_need
  when 'appointments' then 'Записване на часове'
  when 'reservations' then 'Приемане на резервации'
  when 'orders' then 'Приемане на поръчки'
  when 'enquiries' then 'Запитвания и огледи'
  when 'other' then 'Друго'
  else primary_need_label
end
where primary_need_label is null;
