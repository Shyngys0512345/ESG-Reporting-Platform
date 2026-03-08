// src/utils/auditLogger.js

export const logAction = (user, action, target) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    userId: user.id || 'anonymous',
    role: user.role,
    action: action, // Например: "UPDATE_QUESTIONNAIRE", "DELETE_USER"
    target: target, // ID объекта, с которым работали
  };

  // В реальном приложении здесь был бы вызов API:
  // axios.post('/api/audit-logs', logEntry);
  
  console.log('[AUDIT LOG]:', logEntry);
};