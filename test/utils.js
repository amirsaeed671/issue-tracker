function generateIssue(modification = {}) {
    return {
        issue_title: 'test card',
        issue_text: 'test issue description',
        assigned_to: 'test',
        created_by: 'test_user',
        status_text: 'in progress',
        ...modification
    }
}

module.exports = {
    generateIssue
}