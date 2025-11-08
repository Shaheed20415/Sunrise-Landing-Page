<?php
require_once 'config/database.php';
require_once 'config/session.php';

checkAdminLogin();

$database = new Database();
$db = $database->getConnection();

// Get counts for dashboard cards
$enquiry_query = "SELECT COUNT(*) as count FROM enquiry_submissions";
$enquiry_stmt = $db->prepare($enquiry_query);
$enquiry_stmt->execute();
$enquiry_count = $enquiry_stmt->fetch(PDO::FETCH_ASSOC)['count'];

$contact_query = "SELECT COUNT(*) as count FROM contact_submissions";
$contact_stmt = $db->prepare($contact_query);
$contact_stmt->execute();
$contact_count = $contact_stmt->fetch(PDO::FETCH_ASSOC)['count'];

// Get recent submissions
$recent_enquiries_query = "SELECT * FROM enquiry_submissions ORDER BY created_at DESC LIMIT 5";
$recent_enquiries_stmt = $db->prepare($recent_enquiries_query);
$recent_enquiries_stmt->execute();
$recent_enquiries = $recent_enquiries_stmt->fetchAll(PDO::FETCH_ASSOC);

$recent_contacts_query = "SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5";
$recent_contacts_stmt = $db->prepare($recent_contacts_query);
$recent_contacts_stmt->execute();
$recent_contacts = $recent_contacts_stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Sunrise Marketing Solutions</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-orange-600 to-amber-600 shadow-xl">
        <div class="flex items-center justify-center h-16 bg-black bg-opacity-20">
            <h1 class="text-white text-xl font-bold">
                <i class="fas fa-tachometer-alt mr-2"></i>Admin Panel
            </h1>
        </div>
        
        <nav class="mt-8">
            <a href="dashboard.php" class="flex items-center px-6 py-3 text-white bg-black bg-opacity-20 border-r-4 border-white">
                <i class="fas fa-home mr-3"></i>Dashboard
            </a>
            <a href="enquiry-data.php" class="flex items-center px-6 py-3 text-white hover:bg-black hover:bg-opacity-20 transition-all duration-300">
                <i class="fas fa-envelope mr-3"></i>Enquiry Data
            </a>
            <a href="contact-data.php" class="flex items-center px-6 py-3 text-white hover:bg-black hover:bg-opacity-20 transition-all duration-300">
                <i class="fas fa-phone mr-3"></i>Contact Data
            </a>
            <a href="logout.php" class="flex items-center px-6 py-3 text-white hover:bg-red-600 transition-all duration-300 mt-8">
                <i class="fas fa-sign-out-alt mr-3"></i>Logout
            </a>
        </nav>
    </div>

    <!-- Main Content -->
    <div class="ml-64 min-h-screen">
        <!-- Top Header -->
        <header class="bg-white shadow-lg">
            <div class="flex items-center justify-between px-6 py-4">
                <h2 class="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                <div class="flex items-center space-x-4">
                    <span class="text-gray-600">Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?></span>
                    <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white text-sm"></i>
                    </div>
                </div>
            </div>
        </header>

        <!-- Dashboard Content -->
        <main class="p-6">
            <!-- Stats Cards -->
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Total Enquiries</p>
                            <p class="text-3xl font-bold text-blue-600"><?php echo $enquiry_count; ?></p>
                        </div>
                        <div class="bg-blue-100 p-3 rounded-full">
                            <i class="fas fa-envelope text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Contact Messages</p>
                            <p class="text-3xl font-bold text-green-600"><?php echo $contact_count; ?></p>
                        </div>
                        <div class="bg-green-100 p-3 rounded-full">
                            <i class="fas fa-phone text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Total Submissions</p>
                            <p class="text-3xl font-bold text-purple-600"><?php echo $enquiry_count + $contact_count; ?></p>
                        </div>
                        <div class="bg-purple-100 p-3 rounded-full">
                            <i class="fas fa-chart-bar text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Active Admin</p>
                            <p class="text-3xl font-bold text-orange-600">1</p>
                        </div>
                        <div class="bg-orange-100 p-3 rounded-full">
                            <i class="fas fa-user-shield text-orange-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Submissions -->
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Recent Enquiries -->
                <div class="bg-white rounded-xl shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-bold text-gray-800">
                                <i class="fas fa-envelope mr-2 text-blue-600"></i>Recent Enquiries
                            </h3>
                            <a href="enquiry-data.php" class="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                                View All <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    </div>
                    <div class="p-6">
                        <?php if (empty($recent_enquiries)): ?>
                            <p class="text-gray-500 text-center py-8">No enquiries yet</p>
                        <?php else: ?>
                            <div class="space-y-4">
                                <?php foreach ($recent_enquiries as $enquiry): ?>
                                    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-300">
                                        <div class="flex items-start justify-between">
                                            <div class="flex-1">
                                                <h4 class="font-semibold text-gray-800"><?php echo htmlspecialchars($enquiry['name']); ?></h4>
                                                <p class="text-sm text-gray-600"><?php echo htmlspecialchars($enquiry['email']); ?></p>
                                                <p class="text-sm text-gray-500 mt-1"><?php echo htmlspecialchars(substr($enquiry['message'], 0, 50)) . '...'; ?></p>
                                            </div>
                                            <span class="text-xs text-gray-400"><?php echo date('M j, Y', strtotime($enquiry['created_at'])); ?></span>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Recent Contact Messages -->
                <div class="bg-white rounded-xl shadow-lg">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-bold text-gray-800">
                                <i class="fas fa-phone mr-2 text-green-600"></i>Recent Contact Messages
                            </h3>
                            <a href="contact-data.php" class="text-green-600 hover:text-green-800 text-sm font-semibold">
                                View All <i class="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    </div>
                    <div class="p-6">
                        <?php if (empty($recent_contacts)): ?>
                            <p class="text-gray-500 text-center py-8">No contact messages yet</p>
                        <?php else: ?>
                            <div class="space-y-4">
                                <?php foreach ($recent_contacts as $contact): ?>
                                    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-300">
                                        <div class="flex items-start justify-between">
                                            <div class="flex-1">
                                                <h4 class="font-semibold text-gray-800"><?php echo htmlspecialchars($contact['name']); ?></h4>
                                                <p class="text-sm text-gray-600"><?php echo htmlspecialchars($contact['email']); ?></p>
                                                <p class="text-sm text-gray-500 mt-1"><?php echo htmlspecialchars(substr($contact['message'], 0, 50)) . '...'; ?></p>
                                            </div>
                                            <span class="text-xs text-gray-400"><?php echo date('M j, Y', strtotime($contact['created_at'])); ?></span>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>