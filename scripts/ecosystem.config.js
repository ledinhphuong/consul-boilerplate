module.exports = {
  apps : [{
    name: "consul-boilerplate",
    script: "../build/index.js",
    env: {
      "NODE_ENV": "{{ ENVIRONMENT }}"
    }
  }]
}
