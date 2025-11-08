<?php
require_once 'config/database.php';
require_once 'config/session.php';

checkAdminLogin();

$database = new Database();
$db = $database->getConnection();

$id = $_GET['id'];
$type = $_GET['type'];

if ($type === 'enquiry') {
    $query = "SELECT * FROM enquiry_submissions WHERE id = :id";
} else {
    $query = "SELECT * FROM contact_submissions WHERE id = :id";
}

$stmt = $db->prepare($query);
$stmt->bindParam(':id', $id);
$stmt->execute();
$record = $stmt->fetch(PDO::FETCH_ASSOC);

if ($record):
?>
    <div class="space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <p class="text-gray-800 bg-gray-50 p-3 rounded-lg"><?php echo htmlspecialchars($record['name']); ?></p>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <p class="text-gray-800 bg-gray-50 p-3 rounded-lg"><?php echo htmlspecialchars($record['email']); ?></p>
            </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                <p class="text-gray-800 bg-gray-50 p-3 rounded-lg"><?php echo htmlspecialchars($record['phone']); ?></p>
            </div>
            <?php if ($type === 'enquiry' && isset($record['subject'])): ?>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                <p class="text-gray-800 bg-gray-50 p-3 rounded-lg"><?php echo htmlspecialchars($record['subject']); ?></p>
            </div>
            <?php endif; ?>
        </div>
        
        <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <p class="text-gray-800 bg-gray-50 p-3 rounded-lg min-h-24"><?php echo nl2br(htmlspecialchars($record['message'])); ?></p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-4">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <?php
                $status_colors = [
                    'new' => 'bg-blue-100 text-blue-800',
                    'in_progress' => 'bg-yellow-100 text-yellow-800',
                    'resolved' => 'bg-green-100 text-green-800'
                ];
                ?>
                <span class="inline-block px-3 py-2 rounded-full text-sm font-semibold <?php echo $status_colors[$record['status']]; ?>">
                    <?php echo ucfirst(str_replace('_', ' ', $record['status'])); ?>
                </span>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Submitted</label>
                <p class="text-gray-800 bg-gray-50 p-3 rounded-lg"><?php echo date('M j, Y g:i A', strtotime($record['created_at'])); ?></p>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Last Updated</label>
                <p class="text-gray-800 bg-gray-50 p-3 rounded-lg"><?php echo date('M j, Y g:i A', strtotime($record['updated_at'])); ?></p>
            </div>
        </div>
        
        <div class="flex space-x-3 pt-4 border-t border-gray-200">
            <button onclick="editRecord(<?php echo $record['id']; ?>, '<?php echo $type; ?>')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                <i class="fas fa-edit mr-2"></i>Edit Record
            </button>
            <a href="mailto:<?php echo htmlspecialchars($record['email']); ?>" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 inline-block">
                <i class="fas fa-envelope mr-2"></i>Send Email
            </a>
            <a href="https://wa.me/91<?php echo preg_replace('/[^0-9]/', '', $record['phone']); ?>" target="_blank" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 inline-block">
                <i class="fab fa-whatsapp mr-2"></i>WhatsApp
            </a>
        </div>
    </div>
<?php else: ?>
    <p class="text-center text-gray-500 py-8">Record not found.</p>
<?php endif; ?>