<?php
require_once 'config/database.php';
require_once 'config/session.php';

checkAdminLogin();

$database = new Database();
$db = $database->getConnection();

// Handle actions
if ($_POST) {
    $action = $_POST['action'];
    $id = $_POST['id'];
    
    switch ($action) {
        case 'mark_resolved':
            $query = "UPDATE enquiry_submissions SET status = 'resolved' WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            break;
            
        case 'mark_progress':
            $query = "UPDATE enquiry_submissions SET status = 'in_progress' WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            break;
            
        case 'delete':
            $query = "DELETE FROM enquiry_submissions WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            break;
    }
}

// Get all enquiry submissions
$query = "SELECT * FROM enquiry_submissions ORDER BY created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute();
$enquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enquiry Data - Admin Dashboard</title>
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
            <a href="enquiry-data.php" class="flex items-center px-6 py-3 text-white bg-black bg-opacity-20 border-r-4 border-white">
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
                    <i class="fas fa-envelope mr-2 text-blue-600"></i>Enquiry Form Submissions
                </h2>
                <div class="flex items-center space-x-4">
                    <span class="text-gray-600">Total: <?php echo count($enquiries); ?> submissions</span>
                </div>
            </div>
        </header>

        <!-- Content -->
        <main class="p-6">
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            <tr>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Date</th>
                                <th class="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <?php if (empty($enquiries)): ?>
                                <tr>
                                    <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                                        <i class="fas fa-inbox text-4xl mb-4 block"></i>
                                        No enquiry submissions yet
                                    </td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($enquiries as $enquiry): ?>
                                    <tr class="hover:bg-gray-50 transition-colors duration-300">
                                        <td class="px-6 py-4">
                                            <div class="font-semibold text-gray-800"><?php echo htmlspecialchars($enquiry['name']); ?></div>
                                        </td>
                                        <td class="px-6 py-4 text-gray-600"><?php echo htmlspecialchars($enquiry['email']); ?></td>
                                        <td class="px-6 py-4 text-gray-600"><?php echo htmlspecialchars($enquiry['phone']); ?></td>
                                        <td class="px-6 py-4 text-gray-600"><?php echo htmlspecialchars($enquiry['subject']); ?></td>
                                        <td class="px-6 py-4">
                                            <?php
                                            $status_colors = [
                                                'new' => 'bg-blue-100 text-blue-800',
                                                'in_progress' => 'bg-yellow-100 text-yellow-800',
                                                'resolved' => 'bg-green-100 text-green-800'
                                            ];
                                            ?>
                                            <span class="px-3 py-1 rounded-full text-xs font-semibold <?php echo $status_colors[$enquiry['status']]; ?>">
                                                <?php echo ucfirst(str_replace('_', ' ', $enquiry['status'])); ?>
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-gray-600 text-sm"><?php echo date('M j, Y', strtotime($enquiry['created_at'])); ?></td>
                                        <td class="px-6 py-4">
                                            <div class="flex space-x-2">
                                                <button onclick="viewDetails(<?php echo $enquiry['id']; ?>, 'enquiry')" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs transition-colors duration-300">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button onclick="editRecord(<?php echo $enquiry['id']; ?>, 'enquiry')" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs transition-colors duration-300">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <form method="POST" class="inline" onsubmit="return confirm('Mark as resolved?')">
                                                    <input type="hidden" name="action" value="mark_resolved">
                                                    <input type="hidden" name="id" value="<?php echo $enquiry['id']; ?>">
                                                    <button type="submit" class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-xs transition-colors duration-300">
                                                        <i class="fas fa-check"></i>
                                                    </button>
                                                </form>
                                                <form method="POST" class="inline" onsubmit="return confirm('Delete this record permanently?')">
                                                    <input type="hidden" name="action" value="delete">
                                                    <input type="hidden" name="id" value="<?php echo $enquiry['id']; ?>">
                                                    <button type="submit" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition-colors duration-300">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <!-- View Details Modal -->
    <div id="viewModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center">
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-bold text-gray-800">Submission Details</h3>
                    <button onclick="closeModal()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            <div id="modalContent" class="p-6">
                <!-- Content will be loaded here -->
            </div>
        </div>
    </div>

    <script>
        function viewDetails(id, type) {
            // Show modal
            document.getElementById('viewModal').classList.remove('hidden');
            
            // Load content via AJAX
            fetch(`get-details.php?id=${id}&type=${type}`)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('modalContent').innerHTML = data;
                });
        }

        function editRecord(id, type) {
            window.location.href = `edit-record.php?id=${id}&type=${type}`;
        }

        function closeModal() {
            document.getElementById('viewModal').classList.add('hidden');
        }

        // Close modal when clicking outside
        document.getElementById('viewModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    </script>
</body>
</html>