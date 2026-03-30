// MongoDB Data Viewer Script
// Run this with: mongosh doctorappointment view_mongodb_data.js

print("=== DOCTOR APPOINTMENT SYSTEM DATABASE ===\n");

print("📋 COLLECTIONS:");
show collections;

print("\n👥 USERS:");
db.users.find().pretty();

print("\n👨‍⚕️ DOCTORS:");
db.doctors.find().pretty();

print("\n📅 APPOINTMENTS:");
db.appointments.find().pretty();

print("\n🔔 NOTIFICATIONS:");
db.notifications.find().pretty();

print("\n📊 COLLECTION COUNTS:");
print("Users: " + db.users.countDocuments());
print("Doctors: " + db.doctors.countDocuments());
print("Appointments: " + db.appointments.countDocuments());
print("Notifications: " + db.notifications.countDocuments());