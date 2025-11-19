import os
import subprocess
from typing import List, Dict

import requests

SUPABASE_URL = os.environ["SUPABASE_URL"].rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]


def _supabase_headers() -> Dict[str, str]:
    token = SUPABASE_SERVICE_ROLE_KEY
    return {
        "apikey": token,
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
    }


def get_active_users() -> List[Dict]:
    url = f"{SUPABASE_URL}/rest/v1/lottery_users"
    params = {"select": "*", "active": "eq.true"}
    try:
        response = requests.get(url, headers=_supabase_headers(), params=params, timeout=30)
        response.raise_for_status()
    except requests.RequestException as exc:
        raise RuntimeError("Failed to fetch active users from Supabase") from exc

    data = response.json()
    if not isinstance(data, list):
        raise RuntimeError("Unexpected Supabase response while fetching active users")
    return data

def run_for_user(user: dict) -> None:
    subprocess.run(
        ["python", "-m", "scripts.enter-lottery", user["email"], user["password"]],
        check=True,
    )

def main() -> None:
    users = get_active_users()
    for user in users:
        run_for_user(user)

if __name__ == "__main__":
    main()
