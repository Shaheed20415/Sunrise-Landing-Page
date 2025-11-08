<?php
require_once 'config/database.php';
require_once 'config/session.php';

checkAdminLogin();

$database = new Database();
$db = $database->getConnection();

$id = $_GET['id'];
$type = $_GET['type'];
$success_message = '';
$error_message = '';

// Handle form submission
if ($_POST) {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $message = trim($_POST['message']);
    $status = $_POST['status'];
    
    if ($type === 'enquiry') {
        $subject = trim($_POST['subject']);
        $query = "UPDATE enquiry_submissions SET name = :name, email = :email, phone = :phone, subject = :subject, message = :message, status = :status WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':subject', $subject);
    } else {
        $query = "UPDATE contact_submissions SET name = :name, email = :email, phone = :phone, message = :message, status = :status WHERE id = :id";
        $stmt = $db->prepare($query);
    }
    
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':message', $message);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':id', $id);
    
    if ($stmt->execute()) {
        $success_message = 'Record updated successfully!';
    } else {
        $error_message = 'Error updating record.';
    }
}

// Get record data
if ($type === 'enquiry') {
    $query = "SELECT * FROM enquiry_submissions WHERE id = :id";
} else {
    $query = "SELECT * FROM contact_submissions WHERE id = :id";
}

$stmt = $db->prepare($query);
$stmt->bindParam(':id', $id);
$stmt->execute();
$record = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$record) {
    header('Location: dashboard.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Record - Admin Dashboard</title>
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
            <a href="dashboard.php" class="flex items-center px-6 py-3 text-white hover:bg-black hover:bg-opacity-20 transition-all duration-300">
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
                <h2 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-edit mr-2 text-orange-600"></i>Edit <?php echo ucfirst($type); ?> Record
                </h2>
                <a href="<?php echo $type; ?>-data.php" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                    <i class="fas fa-arrow-left mr-2"></i>Back to List
                </a>
            </div>
        </header>

        <!-- Content -->
        <main class="p-6">
            <?php if ($success_message): ?>
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center">
                    <i class="fas fa-check-circle mr-2"></i>
                    <?php echo $success_message; ?>
                </div>
            <?php endif; ?>

            <?php if ($error_message): ?>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    <?php echo $error_message; ?>
                </div>
            <?php endif; ?>

            <div class="bg-white rounded-xl shadow-lg p-8">
                <form method="POST" class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-user mr-2"></i>Name
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                value="<?php echo htmlspecialchars($record['name']); ?>"
                                required
                                class="w-full py-3 px-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300"
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-envelope mr-2"></i>Email
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                value="<?php echo htmlspecialchars($record['email']); ?>"
                                required
                                class="w-full py-3 px-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300"
                            >
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-phone mr-2"></i>Phone
                            </label>
                            <input 
                                type="tel" 
                                name="phone" 
                                value="<?php echo htmlspecialchars($record['phone']); ?>"
                                class="w-full py-3 px-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300"
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-flag mr-2"></i>Status
                            </label>
                            <select 
                                name="status"
                                class="w-full py-3 px-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300"
                            >
                                <option value="new" <?php echo $record['status'] === 'new' ? 'selected' : ''; ?>>New</option>
                                <option value="in_progress" <?php echo $record['status'] === 'in_progress' ? 'selected' : ''; ?>>In Progress</option>
                                <option value="resolved" <?php echo $record['status'] === 'resolved' ? 'selected' : ''; ?>>Resolved</option>
                            </select>
                        </div>
                    </div>

                    <?php if ($type === 'enquiry' && isset($record['subject'])): ?>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-tag mr-2"></i>Subject
                        </label>
                        <input 
                            type="text" 
                            name="subject" 
                            value="<?php echo htmlspecialchars($record['subject']); ?>"
                            class="w-full py-3 px-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300"
                        >
                    </div>
                    <?php endif; ?>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-comment mr-2"></i>Message
                        </label>
                        <textarea 
                            name="message" 
                            rows="6"
                            required
                            class="w-full py-3 px-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 resize-none"
                        ><?php echo htmlspecialchars($record['message']); ?></textarea>
                    </div>

                    <div class="flex space-x-4">
                        <button 
                            type="submit"
                            class="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
                        >
                            <i class="fas fa-save mr-2"></i>Update Record
                        </button>
                        <a 
                            href="<?php echo $type; ?>-data.php"
                            class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center"
                        >
                            <i class="fas fa-times mr-2"></i>Cancel
                        </a>
                    </div>
                </form>
            </div>
        </main>
    </div>
</body>
</html>
<?php else: ?>
    <p class="text-center text-gray-500 py-8">Record not found.</p>
<?php endif; ?>