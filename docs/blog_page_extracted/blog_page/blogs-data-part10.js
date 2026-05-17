// CYZEN Blog Data - Part 10: CRYPTOGRAPHY & PHYSICAL SAFETY
// This file contains extremely detailed, beginner-friendly guides for non-technical users.

const blogsPart10 = [
    {
        id: "encryption-basics-guide",
        title: "Secret Languages: How Encryption Keeps Your Private Chats Private",
        category: "Basic Cryptography",
        author: "CYZEN Crypto Lab",
        date: "February 5, 2026",
        readTime: "25 min read",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
        excerpt: "You don't need to be a math genius to understand encryption. Learn how 'Secret Codes' protect your WhatsApp messages and your bank transfers.",
        content: `
            <h2>The Art of Hiding in Plain Sight</h2>
            <p>Imagine you want to send a secret letter to your friend, but you're worried that the postman might read it. You decide to use a secret code: you replace every 'A' with a '1', every 'B' with a '2', and so on. If the postman opens the letter, he'll just see a jumble of numbers. But your friend has the 'key' (the list of what each number means) and can read the letter perfectly.</p>
            <p>This is exactly what <strong>Encryption</strong> is. It's a high-tech way of scrambling your data into a secret code so that only you and the person you're talking to can read it.</p>

            <h2>1. End-to-End Encryption (The 'Glass Box' Analogy)</h2>
            <p>You've probably seen a notification in WhatsApp or Signal that says: <em>"Messages are end-to-end encrypted."</em> What does that actually mean?</p>
            <p>Think of it like this: You put your message inside a **Sturdy Glass Box** and lock it with a key that only your friend has. You then send that box through the mail. Everyone can see the box exists, but <strong>nobody</strong>—not the post office, not the government, and not even the company that makes the app (like WhatsApp)—has the key to open it. Only your friend can unlock the box and read what's inside.</p>

            <div class="tip-box">
                <strong>Why this matters:</strong> Without encryption, the company that owns the app could read all your private messages and potentially sell that information to advertisers or lose it in a hack.
            </div>

            <h2>2. Encryption in Your Daily Life</h2>
            <p>You are using encryption every single day without knowing it:</p>
            <ul>
                <li><strong>Online Banking:</strong> When you check your balance, your phone and the bank use encryption to hide your financial data from hackers on your Wi-Fi.</li>
                <li><strong>Secure Websites (HTTPS):</strong> That little padlock icon in your browser means the website is using a 'Secret Language' to talk to your computer.</li>
                <li><strong>Disk Encryption:</strong> Both iPhones and Androids (and many modern laptops) encrypt everything stored on them. If you lose your phone, the person who finds it can't see your photos or files without your PIN because the data is 'scrambled'.</li>
            </ul>

            <h2>3. The 'Public Key' Magic</h2>
            <p>How can you send a 'Key' to a website you've never visited before without a hacker stealing the key along the way? Computers use a clever trick called <strong>Public Key Cryptography</strong>.</p>
            <p>Imagine every website has a <strong>Padlock</strong> that they leave out in public for anyone to take. You take their padlock, put your data in a box, and snap the padlock shut. Now, only the website (which has the secret key to that specific padlock) can open the box. Even though the padlock was 'public', the key is 'private'.</p>

            <h2>Summary: Your 'Encryption' Checklist</h2>
            <ol>
                <li><strong>Look</strong> for the padlock in your browser.</li>
                <li><strong>Use</strong> apps that offer 'End-to-End Encryption' (like Signal or WhatsApp) for private conversations.</li>
                <li><strong>Ensure</strong> your phone and computer have 'Device Encryption' turned on (this is usually the default if you use a PIN/Password).</li>
            </ol>
        `
    },
    {
        id: "physical-security-guide",
        title: "The Outside World: Why Physical Security is Just as Important as Your Password",
        category: "Physical Security",
        author: "CYZEN Physical Lab",
        date: "February 1, 2026",
        readTime: "20 min read",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
        excerpt: "Hackers don't always use computers. Sometimes they just look over your shoulder. Learn how to protect your 'Digital Life' in the real world.",
        content: `
            <h2>Cybersecurity Starts in the Real World</h2>
            <p>We spend so much time worrying about hackers in other countries that we often forget about the person sitting next to us at the coffee shop or the stranger standing behind us in line at the ATM. Physical security is the 'foundation' of your digital safety.</p>

            <h2>1. 'Shoulder Surfing' (The Sneak Peek)</h2>
            <p>Imagine you're at a crowded airport. You pull out your laptop to check your email. As you type your password, the person sitting behind you is simply watching your fingers or looking at your screen. This is <strong>Shoulder Surfing</strong>. It's the easiest way to 'hack' someone.</p>
            
            <div class="tip-box">
                <strong>The Solution:</strong> Be mindful of who is around you. If you're in a public place, try to sit with your back to a wall. You can also buy a <strong>Privacy Screen</strong>—a special plastic film for your laptop or phone that makes the screen look black to anyone who isn't looking at it from directly in front.
            </div>

            <h2>2. The 'Unlocked' Danger</h2>
            <p>You're at the library, and you need to go to the restroom. You leave your laptop on the table for just two minutes. It's still logged into your email and your bank. In those two minutes, a thief can walk by, plug in a small USB 'key', and steal all your saved passwords or install a 'Pocket Spy'.</p>
            <p><strong>The Rule:</strong> Never, ever leave your devices unattended in public. Even if you think you'll only be gone for a second. If you must step away, <strong>Lock your screen</strong> (Windows Key + L on PC, or Command + Control + Q on Mac).</p>

            <h2>3. Lost and Found (The Phone Trap)</h2>
            <p>If you find a 'Free' USB drive in a parking lot or a park, <strong>do not plug it into your computer</strong>. Scammers often 'drop' these drives hoping a curious person will pick them up and plug them in. Once you do, the drive automatically installs malware that can take over your computer. It's the modern version of the 'Trojan Horse'.</p>

            <h2>4. Your Webcam and Microphone</h2>
            <p>Hackers who get into your computer can sometimes turn on your webcam without the little light coming on. While this sounds like a movie plot, it does happen. A simple piece of tape or a 'Webcam Cover' (which costs $1) is a physical solution to a digital problem.</p>

            <h2>Summary: Your 'Physical' Security Checklist</h2>
            <ol>
                <li><strong>Lock</strong> your screen every time you step away.</li>
                <li><strong>Watch</strong> for 'Shoulder Surfers' in public places.</li>
                <li><strong>Never</strong> plug in a USB drive you found on the street.</li>
                <li><strong>Cover</strong> your webcam when you aren't using it.</li>
                <li><strong>Use</strong> a Privacy Screen if you work in public often.</li>
            </ol>
        `
    }
];

// Initialize global blog storage
if (!window.cyzenBlogs) window.cyzenBlogs = [];
window.cyzenBlogs = [...window.cyzenBlogs, ...blogsPart10];
