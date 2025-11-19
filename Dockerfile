# Use official Playwright Python base image (includes browsers)
FROM mcr.microsoft.com/playwright/python:v1.49.0-jammy

# Set workdir
WORKDIR /app

# Copy requirements (or pyproject.toml) first for caching
COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . /app

# Optional: ensure playwright deps are installed (usually already in base image)
# RUN playwright install --with-deps chromium

# Default entrypoint: orchestrator script
CMD ["python", "-m", "scripts.run_all_users"]
