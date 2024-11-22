module.exports = {
  plugins: [
    "@dwmt/commitlint-plugin-jira-type",
    "commitlint-plugin-jira-rules",
  ],
  extends: ["jira"],
  rules: {
    "jira-type-type-enum": [2, "always", ["feat", "fix"]],
    "jira-task-id-empty": true,
  },
};
