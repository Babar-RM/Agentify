"""
SIMPLE AUTOMATED RUNNER WITH EMAIL SUPPORT
Just configure once and run!
"""

import json
import os
import sys

# Auto-configure UTF-8 console output on Windows to prevent UnicodeEncodeError with emojis
if sys.platform == 'win32':
    try:
        if hasattr(sys.stdout, 'reconfigure'):
            sys.stdout.reconfigure(encoding='utf-8')
        if hasattr(sys.stderr, 'reconfigure'):
            sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

try:
    from gemini_integration import AutomatedLeetCodeSystem
except ImportError:
    print("❌ Error: Make sure gemini_integration.py is in the same folder!")
    sys.exit(1)


def create_config_template():
    """Create a config.json template"""
    config = {
        "gemini_api_key": "YOUR_GEMINI_API_KEY_HERE",
        "neon_db_url": "postgresql://username:password@host.region.aws.neon.tech/dbname?sslmode=require",
        "brevo_api_key": "YOUR_BREVO_API_KEY_HERE",
        "github_token": ""
    }
    
    with open('config.json', 'w') as f:
        json.dump(config, f, indent=2)
    
    print("\n✅ Created config.json template!")
    print("\n📝 Please edit config.json and add:")
    print("   1. Your Gemini API key (https://makersuite.google.com/app/apikey)")
    print("   2. Your Neon PostgreSQL URL (https://neon.tech)")
    print("   3. Your Brevo API key (https://app.brevo.com/settings/keys/api)")
    print("   4. GitHub token (optional)\n")
    print("Then run this script again!")
    sys.exit(0)


def load_config():
    """Load and validate config"""
    if not os.path.exists('config.json'):
        print("❌ config.json not found!")
        create_config_template()
    
    with open('config.json', 'r') as f:
        config = json.load(f)
    
    errors = []
    
    if config.get('gemini_api_key', '').startswith('YOUR_'):
        errors.append("❌ Set your Gemini API key in config.json")
    
    neon_url = config.get('neon_db_url', '')
    if 'username:password' in neon_url or neon_url.startswith('YOUR_'):
        errors.append("❌ Set your Neon PostgreSQL URL in config.json")
    
    if config.get('brevo_api_key', '').startswith('YOUR_'):
        print("⚠️ Warning: Brevo API key not set. Email features will be disabled.")
    
    if errors:
        print("\n".join(errors))
        print("\n📝 Edit config.json with your credentials")
        sys.exit(1)
    
    return config


def main():
    print("=" * 70)
    print("🚀 LEETCODE AUTOMATED ANALYZER WITH EMAIL AGENT")
    print("=" * 70)
    print("\nThis tool will:")
    print("  1. Extract all LeetCode solutions from GitHub repo")
    print("  2. Analyze them with Gemini AI")
    print("  3. Store structured data in PostgreSQL (Neon)")
    print("  4. Register you for daily email challenges")
    print("  5. Send welcome email immediately")
    print("=" * 70)
    
    # Load configuration
    print("\n[1] Loading configuration...")
    config = load_config()
    print("✅ Configuration loaded")
    
    # Get GitHub URL
    print("\n[2] Enter GitHub Repository URL")
    print("Examples:")
    print("   • https://github.com/username/leetcode-solutions")
    print("   • https://github.com/username/repo/tree/main/LeetCode-75")
    print("\n💡 Tip: You can provide a direct link to a folder!")
    
    repo_url = input("\nGitHub URL: ").strip()
    
    if not repo_url:
        print("❌ URL is required!")
        sys.exit(1)
    
    if 'github.com' not in repo_url:
        print("❌ Invalid GitHub URL!")
        print("URL must contain 'github.com'")
        sys.exit(1)
    
    # Get user email
    print("\n[3] Enter Your Email (for daily problem recommendations)")
    print("💡 You'll receive:")
    print("   • Welcome email immediately")
    print("   • Daily LeetCode problem at 8:00 AM")
    print("   • Personalized recommendations based on your progress")
    
    user_email = input("\nEmail : ").strip()
    
    if user_email and '@' not in user_email:
        print("⚠️ Invalid email format. Continuing without email...")
        user_email = None
    
    if not user_email:
        print("⚠️ Skipping email registration. You won't receive daily problems.")
    
    # Initialize system
    print("\n[4] Initializing system...")
    system = AutomatedLeetCodeSystem(
        gemini_api_key=config['gemini_api_key'],
        neon_db_url=config['neon_db_url'],
        github_token=config.get('github_token') or None,
        brevo_api_key=config.get('brevo_api_key') or None,
        brevo_sender_email=config.get('brevo_sender_email') or 'kingarain7866@gmail.com',
        brevo_sender_name=config.get('brevo_sender_name') or 'Agentify'
    )
    print("✅ System initialized")
    
    # Process
    print("\n[5] Starting automated processing...")
    print("-" * 70)
    
    try:
        system.process_repository(repo_url, user_email)
    except KeyboardInterrupt:
        print("\n\n⚠️ Process interrupted by user")
        sys.exit(0)
    except Exception as e:
        print(f"\n\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    
    print("\n" + "=" * 70)
    print("✅ ALL DONE!")
    print("=" * 70)
    print("\n💡 Next steps:")
    print("   • View your data in Neon dashboard: https://console.neon.tech")
    print("   • Query: SELECT * FROM leetcode_solutions;")
    if user_email:
        print(f"   • Check your email ({user_email}) for welcome message")
        print("   • Tomorrow at 8 AM: You'll receive your first daily problem!")
        print("   • Run daily scheduler: python daily_scheduler.py")
    print("\n" + "=" * 70)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Goodbye!")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()