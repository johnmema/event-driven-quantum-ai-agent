create table public.lottery_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password text not null,
  active boolean not null default true,
  created_at timestamptz default now()
);
alter table public.lottery_users enable row level security;
create policy "service role read" on public.lottery_users
  for select using (true);
