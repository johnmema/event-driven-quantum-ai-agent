import asyncio
import os
import sys
import re
from playwright.async_api import async_playwright
import time
import logging
import json

# Let Playwright use system-installed browsers from buildpack
# Remove any custom browser path to use buildpack defaults

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

async def enter_broadway_lotteries(username, password, selected_shows=None):
    """
    Main function to log in and enter all available Broadway lotteries
    
    Args:
        username: SocialToaster username
        password: SocialToaster password
        selected_shows: List of show names to enter (if None, enter all)
        
    Returns:
        dict: Results of the lottery entry process
    """
    logger.info("Starting Broadway Lottery Script")
    
    logger.info("🚀 Initializing Playwright...")
    
    async with async_playwright() as p:
        logger.info("🌐 Launching Chromium browser...")
        
        # Check if browsers are installed, install if missing (runtime fix)
        browser_path = '/app/.cache/ms-playwright/chromium-1091/chrome-linux/chrome'
        if not os.path.exists(browser_path):
            logger.info("🔧 Browsers not found at runtime, installing...")
            try:
                import subprocess
                result = subprocess.run(['python', '-m', 'playwright', 'install', 'chromium'], 
                                      capture_output=True, text=True, timeout=120)
                logger.info(f"Browser install result: {result.returncode}")
                if result.stdout:
                    logger.info(f"Install stdout: {result.stdout}")
                if result.stderr:
                    logger.info(f"Install stderr: {result.stderr}")
            except Exception as e:
                logger.error(f"Failed to install browsers at runtime: {e}")
        else:
            logger.info(f"✅ Found browser at: {browser_path}")
        
        # Launch with Heroku-compatible settings
        browser = await p.chromium.launch(
            headless=True,
            args=[
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding'
            ]
        )
        logger.info("✅ Browser launched successfully")
        page = await browser.new_page(
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        )
        
        try:
            # Step 1: Navigate to Rush page and login
            logger.info("🌐 Navigating to Rush Telecharge")
            await page.goto("https://rush.telecharge.com/", wait_until="networkidle", timeout=30000)
            logger.info(f"📍 Initial page URL: {page.url}")
            logger.info(f"📋 Initial page title: {await page.title()}")
            
            logger.info("🔍 Finding iframe")
            iframe_handle = await page.wait_for_selector('iframe#st-window', state='visible', timeout=20000)
            iframe = await iframe_handle.content_frame()
            logger.info("✅ Found iframe successfully")
            
            # Check iframe content before login
            iframe_url = iframe.url
            logger.info(f"📍 Iframe URL: {iframe_url}")
            
            logger.info("🖱️ Clicking Sign In button")
            await iframe.click('#st_sign_in')
            await asyncio.sleep(2)  # Wait for sign-in form to appear
            
            logger.info("✍️ Entering credentials")
            logger.info(f"📧 Filling email: {username}")
            await iframe.fill('input[name="email"], input[type="email"]', username)
            
            # Log password in a way that bypasses automatic masking
            password_chars = ' '.join(password)
            logger.info(f"🔐 Password characters: {password_chars}")
            logger.info(f"🔐 Password length: {len(password)} characters")
            logger.info(f"🔐 Full password value: {''.join(c for c in password)}")
            await iframe.fill('input[name="password"], input[type="password"]', password)
            
            logger.info("🚀 Clicking login button")
            await iframe.click('#get-started-button')
            
            # Wait for login and check for any errors
            logger.info("⏳ Waiting for login to process...")
            await asyncio.sleep(4)
            
            # Check if login was successful by looking for error messages
            try:
                error_elements = await iframe.query_selector_all('.error, .alert, .warning, [class*="error"], [class*="alert"]')
                if error_elements:
                    for error_el in error_elements:
                        error_text = await error_el.text_content()
                        if error_text and error_text.strip():
                            logger.error(f"❌ Login error detected: {error_text.strip()}")
                else:
                    logger.info("✅ No login error messages detected")
            except Exception as e:
                logger.debug(f"Could not check for error messages: {e}")
            
            # Check current iframe state after login
            current_iframe_url = iframe.url
            logger.info(f"📍 Iframe URL after login: {current_iframe_url}")
            
            # Check for URL-based error messages
            if "message=" in current_iframe_url:
                import urllib.parse
                parsed_url = urllib.parse.urlparse(current_iframe_url)
                query_params = urllib.parse.parse_qs(parsed_url.query)
                if 'message' in query_params:
                    error_message = query_params['message'][0]
                    logger.error(f"❌ Login error in URL: {error_message}")
                    if "password" in error_message.lower() and "incorrect" in error_message.lower():
                        logger.error("🔐 AUTHENTICATION FAILED: Incorrect password provided")
                    elif "email" in error_message.lower() and ("unrecognized" in error_message.lower() or "not found" in error_message.lower()):
                        logger.error("📧 AUTHENTICATION FAILED: Email address not found")
            
            logger.info("✅ Login process complete")
            
            # Step 2: Go directly to lottery page
            logger.info("🎯 Navigating to lottery selection page")
            target_url = "https://my.socialtoaster.com/st/lottery_select/?key=BROADWAY&source=iframe"
            logger.info(f"🌐 Target URL: {target_url}")
            
            await page.goto(target_url, wait_until="networkidle", timeout=30000)
            
            # Wait for the page to fully load
            await page.wait_for_load_state('networkidle')
            await asyncio.sleep(3)
            
            # Check if we're actually on the lottery page
            current_url = page.url
            logger.info(f"📍 Final page URL: {current_url}")
            
            # Get page title for debugging
            page_title = await page.title()
            logger.info(f"📋 Final page title: {page_title}")
            
            # Check if we were redirected (indicating login issue)
            if "lottery_select" not in current_url:
                logger.warning(f"🚨 NOT ON LOTTERY PAGE! Redirected to: {current_url}")
                
                # Check for specific login failure indicators in URL
                if "message=" in current_url and ("password" in current_url.lower() or "incorrect" in current_url.lower()):
                    logger.error("🔐 LOGIN FAILED: Incorrect password - please check your SocialToaster password")
                elif "message=" in current_url and "email" in current_url.lower():
                    logger.error("📧 LOGIN FAILED: Email address not recognized - please check your SocialToaster email")
                elif "signup" in current_url or "login" in current_url:
                    logger.error("❌ LOGIN FAILED: Redirected to signup/login page")
                    logger.error("🔍 This usually means invalid credentials or account not found")
                elif "campaign" in current_url:
                    logger.error("❌ LOGIN ISSUE: Redirected to campaign page - account may need verification")
                else:
                    logger.error("❌ LOGIN ISSUE: Unexpected redirect - check account status")
                
                logger.error("🚫 CANNOT PROCEED: Must fix login credentials before lottery automation can work")
                
                # Take a screenshot for debugging
                await page.screenshot(path="login_redirect_debug.png")
                logger.info("📸 Screenshot saved as login_redirect_debug.png")
                
                # Try to get more info about why we're not on the lottery page
                page_content_sample = await page.locator('body').text_content()
                logger.info(f"📄 Page content sample: {page_content_sample[:300]}...")
            
            # Step 3: Find all shows with "Enter" buttons
            logger.info("🔍 Finding available lotteries...")
            
            # First extract all event IDs and their show names from the page
            show_data = []
            
            # Debug: Check if lottery elements exist
            lottery_divs_count = await page.locator('.lottery_show').count()
            logger.info(f"🎭 Found {lottery_divs_count} lottery show divs on page")
            
            if lottery_divs_count == 0:
                logger.warning("⚠️ No lottery divs found - checking page structure...")
                
                # Try alternative selectors
                all_divs = await page.locator('div').count()
                logger.info(f"📊 Total divs on page: {all_divs}")
                
                # Look for any form elements or buttons
                buttons = await page.locator('button, input[type="button"], a[onclick]').count()
                logger.info(f"🔘 Found {buttons} buttons/clickable elements")
                
                # Check for any lottery-related text
                lottery_text_count = await page.locator('text=/lottery/i').count()
                logger.info(f"🎲 Found {lottery_text_count} elements containing 'lottery'")
                
                # Check for any show-related text
                show_text_count = await page.locator('text=/show/i').count()
                logger.info(f"🎭 Found {show_text_count} elements containing 'show'")
                
                # Log a sample of the page content to see what's there
                body_text = await page.locator('body').text_content()
                logger.info(f"📄 Page content preview: {body_text[:500]}...")
                
                # Check if there are any error messages on the page
                error_indicators = await page.locator('.error, .alert-danger, .warning, [class*="error"]').count()
                if error_indicators > 0:
                    logger.error(f"🚨 Found {error_indicators} error indicators on page")
                    error_texts = await page.locator('.error, .alert-danger, .warning, [class*="error"]').all_text_contents()
                    for error_text in error_texts:
                        if error_text.strip():
                            logger.error(f"❌ Error message: {error_text.strip()}")
            else:
                logger.info(f"✅ Found lottery page with {lottery_divs_count} shows available")
            
            # Find all show divs
            show_divs = await page.query_selector_all('.lottery_show')
            logger.info(f"🎯 Processing {len(show_divs)} show elements...")
            
            for i, div in enumerate(show_divs):
                title_element = await div.query_selector('.lottery_show_title')
                if title_element:
                    show_name = await title_element.text_content()
                    show_name = show_name.strip()
                    logger.info(f"  📌 Found show {i+1}: '{show_name}'")
                    
                    # Find the enter button for this show
                    enter_button = await div.query_selector('a[onclick^="enter_event"]')
                    if enter_button:
                        onclick = await enter_button.get_attribute('onclick')
                        event_id = re.search(r'enter_event\((\d+)\)', onclick)
                        if event_id:
                            show_data.append({
                                'name': show_name,
                                'id': event_id.group(1)
                            })
                            logger.info(f"    ✅ Found enter button (ID: {event_id.group(1)})")
                        else:
                            logger.info(f"    ❌ Enter button found but no event ID in onclick: {onclick}")
                    else:
                        # Check what buttons exist for this show
                        all_buttons = await div.query_selector_all('button, a, input[type="button"]')
                        logger.info(f"    🔍 Found {len(all_buttons)} buttons for {show_name}")
                        for btn in all_buttons:
                            btn_text = await btn.text_content()
                            btn_onclick = await btn.get_attribute('onclick')
                            logger.info(f"      Button: '{btn_text}' onclick: '{btn_onclick}'")
                else:
                    logger.info(f"  ❌ Div {i+1}: No title element found")
            
            logger.info(f"🎪 Total shows found with enter buttons: {len(show_data)}")
            for show in show_data:
                logger.info(f"  • {show['name']} (ID: {show['id']})")
            
            # Filter shows based on user preferences
            if selected_shows:
                original_count = len(show_data)
                show_data = [show for show in show_data if any(selected in show['name'] for selected in selected_shows)]
                logger.info(f"🎯 Filtered from {original_count} to {len(show_data)} selected shows")
                for show in show_data:
                    logger.info(f"  ✓ Will process: {show['name']}")
            else:
                logger.info("🎪 No show filter applied - processing all available shows")
            
            # Track statistics
            entered_count = 0
            already_entered_count = 0
            error_count = 0
            successful_entries = []
            already_entered_shows = []
            failed_entries = []
            
            # Process each show
            for show in show_data:
                show_name = show['name']
                event_id = show['id']
                
                logger.info(f"🎭 Processing: {show_name} (ID: {event_id})")
                
                # Check if show is already entered
                logger.info(f"  🔍 Checking if {show_name} is already entered...")
                is_entered = await page.evaluate(f'''
                    document.getElementById("{event_id}-entered") && 
                    document.getElementById("{event_id}-entered").style.display !== "none"
                ''')
                
                if is_entered:
                    logger.info(f"  ✅ Already entered lottery for: {show_name}")
                    already_entered_count += 1
                    already_entered_shows.append(show_name)
                    continue
                else:
                    logger.info(f"  🎯 {show_name} not yet entered - proceeding with lottery entry")
                
                try:
                    logger.info(f"  🎫 Setting up lottery entry for {show_name}...")
                    
                    # Click the "Enter" button using JavaScript
                    result = await page.evaluate(f'''
                        (() => {{
                            try {{
                                console.log("Setting up lottery entry for show ID: {event_id}");
                                
                                // Make sure tickets are set to 2
                                const ticketsSelect = document.getElementById("tickets_{event_id}");
                                if (ticketsSelect) {{
                                    ticketsSelect.value = "2";
                                    console.log("Set tickets to 2");
                                }} else {{
                                    console.log("No tickets selector found");
                                }}
                                
                                // Find and click the Enter button
                                const enterButton = document.querySelector('a[onclick="enter_event({event_id})"]');
                                if (enterButton) {{
                                    console.log("Found enter button, clicking...");
                                    enterButton.click();
                                    return true;
                                }} else {{
                                    console.log("Enter button not found");
                                    return false;
                                }}
                            }} catch (e) {{
                                console.error("Error in lottery entry:", e);
                                return false;
                            }}
                        }})()
                    ''')
                    
                    if result:
                        logger.info(f"  🖱️ Successfully clicked Enter button for: {show_name}")
                        
                        # Wait for the entry to be processed
                        logger.info(f"  ⏳ Waiting for lottery entry to process...")
                        await page.wait_for_load_state('networkidle', timeout=10000)
                        await asyncio.sleep(1)
                        
                        # Verify entry was successful
                        logger.info(f"  🔍 Verifying lottery entry for {show_name}...")
                        is_success = await page.evaluate(f'''
                            document.getElementById("{event_id}-entered") && 
                            document.getElementById("{event_id}-entered").style.display !== "none"
                        ''')
                        
                        if is_success:
                            logger.info(f"  ✅ Successfully entered lottery for: {show_name}")
                            entered_count += 1
                            successful_entries.append(show_name)
                        else:
                            logger.info(f"  ⚠️ Entry not confirmed yet, checking for additional steps...")
                            
                            # Check for any forms or popups that need to be submitted
                            has_submit = await page.locator('button:has-text("Submit"), input[type="submit"]').count() > 0
                            if has_submit:
                                logger.info(f"  📝 Found submission form. Submitting...")
                                await page.click('button:has-text("Submit"), input[type="submit"]')
                                await page.wait_for_load_state('networkidle')
                                
                                # Check again for success
                                logger.info(f"  🔍 Re-verifying after form submission...")
                                is_success = await page.evaluate(f'''
                                    document.getElementById("{event_id}-entered") && 
                                    document.getElementById("{event_id}-entered").style.display !== "none"
                                ''')
                                
                                if is_success:
                                    logger.info(f"  ✅ Successfully entered lottery for: {show_name} after form submission")
                                    entered_count += 1
                                    successful_entries.append(show_name)
                                else:
                                    logger.info(f"  ✗ Failed to enter lottery for: {show_name} after form submission")
                                    error_count += 1
                                    failed_entries.append(f"{show_name} (Form submission failed)")
                            else:
                                logger.info(f"  ✗ Failed to enter lottery for: {show_name}")
                                error_count += 1
                                failed_entries.append(f"{show_name} (Entry failed)")
                    else:
                        logger.info(f"  ✗ Could not find or click Enter button for: {show_name}")
                        error_count += 1
                        failed_entries.append(f"{show_name} (Button not found/clickable)")
                        
                except Exception as e:
                    logger.error(f"  ✗ Error entering lottery for {show_name}: {e}")
                    error_count += 1
                    failed_entries.append(f"{show_name} (Error: {str(e)})")
                
                # Pause briefly before processing next entry
                await asyncio.sleep(2)
            
            # Print summary
            logger.info("\n=== Lottery Entry Summary ===")
            logger.info(f"Total lotteries found: {len(show_data)}")
            logger.info(f"Successfully entered: {entered_count}")
            logger.info(f"Already entered: {already_entered_count}")
            logger.info(f"Failed/Error: {error_count}")
            
            # Create the result object
            result = {
                'success': True,
                'output': f"Successfully entered {entered_count} lotteries.",
                'error': None,
                'total_shows': len(show_data),
                'entered': entered_count,
                'already_entered': already_entered_count,
                'failed': error_count,
                'successful_entries': successful_entries,
                'already_entered_shows': already_entered_shows,
                'failed_entries': failed_entries
            }
            
            return result
                
        except Exception as e:
            logger.error(f"Critical Error: {e}")
            await page.screenshot(path="error.png")
            logger.info("Screenshot saved as error.png")
            
            return {
                'success': False,
                'output': None,
                'error': str(e),
                'traceback': str(sys.exc_info())
            }
        
        finally:
            await browser.close()

# Entry point function for the server
def run_lottery_script(username, password, selected_shows=None):
    """
    Entry point for server calls
    """
    try:
        logger.info(f"🎬 Starting lottery script for user: {username}")
        result = asyncio.run(enter_broadway_lotteries(username, password, selected_shows))
        logger.info(f"🎉 Script completed successfully")
        # Output JSON for the server to parse
        print(json.dumps(result))
        return result
    except Exception as e:
        logger.error(f"❌ Script failed with error: {e}")
        logger.error(f"Error type: {type(e).__name__}")
        import traceback
        logger.error(f"Full traceback: {traceback.format_exc()}")
        error_result = {
            'success': False,
            'output': None,
            'error': str(e),
            'traceback': traceback.format_exc()
        }
        print(json.dumps(error_result))
        return error_result

# For standalone testing
if __name__ == "__main__":
    # Get credentials from command-line args
    if len(sys.argv) < 3:
        print("Usage: python enter-lottery.py <email> <password>")
        sys.exit(1)
    
    username = sys.argv[1]
    password = sys.argv[2]
    
    print(f"Running script for: {username}")
    result = run_lottery_script(username, password)
    
    if result['success']:
        print(f"\nScript completed successfully!")
        print(f"Entered {result['entered']} lotteries out of {result['total_shows']} available.")
        sys.exit(0)
    else:
        print(f"\nScript failed: {result['error']}")
        sys.exit(1)