require('dotenv').config();
const mongoose = require('mongoose');
const Hackathon = require('./models/Hackathon');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hackaplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    // Clear existing data
    await Hackathon.deleteMany({});
    await User.deleteMany({});

    // Create sample users
    const organizer = new User({
      firebaseUid: 'organizer123',
      email: 'organizer@hackaplace.com',
      displayName: 'Hackaplace Team',
      role: 'organizer'
    });

    await organizer.save();

    // Create sample hackathons
    const hackathons = [
      {
        name: "Hackaplace Innovation Challenge 2026",
        organizer: organizer._id,
        status: "ongoing",
        mode: "online",
        startDate: "2026-02-01",
        endDate: "2026-02-03",
        deadline: "2026-01-28",
        teamType: "Team (2-4 members)",
        description: "Build the future of digital collaboration tools in this 48-hour challenge. We are looking for innovative solutions that bridge the gap between remote and in-office work.",
        problemDomains: ["Future of Work", "Collaboration Tools", "Remote Productivity"],
        prizes: ["$10,000 First Place", "$5,000 Second Place", "Internship Opportunities"],
        rules: "All code must be written during the event. Use of open source libraries is allowed.",
        eligibility: "Open to all verified Hackaplace users.",
        evaluationCriteria: "Innovation (40%), Technical Complexity (30%), Usability (30%)"
      },
      {
        name: "AI for Social Good",
        organizer: organizer._id,
        status: "upcoming",
        mode: "hybrid",
        startDate: "2026-03-15",
        endDate: "2026-03-17",
        deadline: "2026-03-01",
        teamType: "Solo or Team (1-3 members)",
        description: "Leverage the power of Artificial Intelligence to solve pressing social issues. Focus areas include healthcare, education, and environmental sustainability.",
        problemDomains: ["Healthcare AI", "EdTech", "Sustainability"],
        prizes: ["$15,000 Grand Prize", "Cloud Credits", "Mentorship from AI Experts"],
        rules: "Models must be open-sourced. Pre-trained models are allowed if publicly available.",
        eligibility: "Students and Professionals.",
        evaluationCriteria: "Social Impact (50%), Technical Implementation (50%)"
      },
      {
        name: "Sustainable Future Hackathon",
        organizer: organizer._id,
        status: "upcoming",
        mode: "offline",
        startDate: "2026-04-10",
        endDate: "2026-04-12",
        deadline: "2026-03-25",
        teamType: "Team (3-5 members)",
        description: "Create hardware or software solutions to promote sustainability and reduce carbon footprint.",
        problemDomains: ["Clean Energy", "Waste Management", "Smart Cities"],
        prizes: ["$20,000 Prize Pool", "Incubation Support"],
        rules: "Hardware prototypes encouraged.",
        eligibility: "Open to all.",
        evaluationCriteria: "Feasibility (40%), Impact (30%), Prototype (30%)"
      }
    ];

    for (const hackathonData of hackathons) {
      const hackathon = new Hackathon(hackathonData);
      await hackathon.save();
    }

    console.log('Database seeded successfully!');
    console.log(`Created ${hackathons.length} hackathons and 1 organizer`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
