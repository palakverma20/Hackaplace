// Simulating AI-based fetching of hackathons from the internet
export const fetchExternalHackathons = () => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve([
        // --- JANUARY 2026 ---
        {
          id: 3,
          name: "HackMIT Winter",
          month: "January 2026",
          startDate: "2026-01-16",
          status: "Ongoing",
          deadline: "20 Jan 2026",
          mode: "Offline",
          about: "MIT's flagship winter hackathon. A weekend of coding, workshops, and networking.",
          questions: "Open-ended tracks. Build anything you want.",
        },
        {
          id: 4,
          name: "Global Game Jam",
          month: "January 2026",
          startDate: "2026-01-22",
          status: "Upcoming",
          deadline: "22 Jan 2026",
          mode: "Online",
          about: "The world's largest game creation event taking place around the globe.",
          questions: "Theme will be announced at the start. Build a game in 48 hours.",
        },
        {
          id: 5,
          name: "Stripe CTF",
          month: "January 2026",
          startDate: "2026-01-28",
          status: "Upcoming",
          deadline: "28 Jan 2026",
          mode: "Online",
          about: "Capture the Flag security competition hosted by Stripe.",
          questions: "Web security, cryptography, and systems engineering challenges.",
        },

        // --- FEBRUARY 2026 (Testing > 5 items) ---
        {
          id: 1,
          name: "Google Solution Challenge",
          month: "February 2026",
          startDate: "2026-02-01",
          status: "Upcoming",
          deadline: "15 Feb 2026",
          mode: "Online",
          about: "Solve local problems using Google technologies.",
          questions: "Must use at least one Google technology. Focus on UN SDGs.",
        },
        {
          id: 6,
          name: "HackTheNorth",
          month: "February 2026",
          startDate: "2026-02-05",
          status: "Upcoming",
          deadline: "25 Feb 2026",
          mode: "Hybrid",
          about: "Canada's biggest hackathon.",
          questions: "General tracks + sponsored challenges.",
        },
        {
          id: 7,
          name: "ETH Denver",
          month: "February 2026",
          startDate: "2026-02-10",
          status: "Upcoming",
          deadline: "20 Feb 2026",
          mode: "Offline",
          about: "The largest Web3 #BUIDLathon in the world.",
          questions: "Building specifically on Ethereum ecosystem.",
        },
        {
          id: 8,
          name: "DeveloperWeek Hackathon",
          month: "February 2026",
          startDate: "2026-02-12",
          status: "Upcoming",
          deadline: "14 Feb 2026",
          mode: "Online",
          about: "The nation's largest festival of developers.",
          questions: "Enterprise tech, AI, and cloud challenges.",
        },
        {
          id: 9,
          name: "TreeHacks",
          month: "February 2026",
          startDate: "2026-02-14",
          status: "Upcoming",
          deadline: "16 Feb 2026",
          mode: "Offline",
          about: "Stanford's premier hackathon.",
          questions: "Health, Safety, and Awareness tracks.",
        },
        {
          id: 10,
          name: "Ignition Hacks", // (Should be the 6th item, likely cut off if limit is 5)
          month: "February 2026",
          startDate: "2026-02-28",
          status: "Upcoming",
          deadline: "28 Feb 2026",
          mode: "Online",
          about: "AI and ML focused hackathon for beginners.",
          questions: "Best use of TensorFlow or PyTorch.",
        },

        // --- MARCH 2026 ---
        {
          id: 2,
          name: "Smart India Hackathon",
          month: "March 2026",
          startDate: "2026-03-05",
          status: "Upcoming",
          deadline: "5 March 2026",
          mode: "Hybrid",
          about: "Nationwide initiative for solving daily life problems.",
          questions: "Hardware and Software editions available.",
        },
        {
          id: 11,
          name: "Meta Hacker Cup",
          month: "March 2026",
          startDate: "2026-03-15",
          status: "Upcoming",
          deadline: "15 Mar 2026",
          mode: "Online",
          about: "Meta's annual algorithmic programming contest.",
          questions: "Emphasis on algorithmic efficiency and speed.",
        },

        // --- APRIL 2026 ---
        {
          id: 12,
          name: "Space Apps Challenge",
          month: "April 2026",
          startDate: "2026-04-20",
          status: "Upcoming",
          deadline: "22 Apr 2026",
          mode: "Online",
          about: "NASA's International Space Apps Challenge.",
          questions: "Use NASA's open data to build innovative solutions.",
        },

        // --- MAY 2026 ---
        {
          id: 13,
          name: "Microsoft Imagine Cup",
          month: "May 2026",
          startDate: "2026-05-10",
          status: "Upcoming",
          deadline: "15 May 2026",
          mode: "Hybrid",
          about: "Global student technology competition.",
          questions: "Categories: Earth, Education, Health, and Lifestyle.",
        },
        {
          id: 14,
          name: "TechCrunch Disrupt",
          month: "May 2026",
          startDate: "2026-05-25",
          status: "Upcoming",
          deadline: "27 May 2026",
          mode: "Offline",
          about: "The original startup battlefield hackathon.",
          questions: "Build a product and launch it in 24 hours.",
        },

        // --- JUNE 2026 ---
        {
          id: 15,
          name: "Apple WWDC Swift Challenge",
          month: "June 2026",
          startDate: "2026-06-05",
          status: "Upcoming",
          deadline: "10 Jun 2026",
          mode: "Online",
          about: "Student challenge to create a Swift Playgrounds app scene.",
          questions: "Demonstrate creativity and technical skill with Swift.",
        }
      ]);
    }, 1500);
  });
};
