<template>
  <div class="landing">
    <nav>
      <span class="logo">TaskBuddy</span>
      <div class="nav-links">
        <router-link to="/login">Login</router-link>
        <router-link to="/register" class="btn-primary">Get Started</router-link>
      </div>
    </nav>

    <div class="hero">
      <h1>Manage Your Tasks <span>Effortlessly</span></h1>
      <p>TaskBuddy helps you stay organized, track progress, and get things done — all in one place.</p>
      <div class="hero-btns">
        <router-link to="/register" class="btn-primary">Get Started Free</router-link>
        <router-link to="/login" class="btn-outline">Login</router-link>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <span>📝</span>
        <h3>Create Tasks</h3>
        <p>Quickly add tasks with title, description, priority and status.</p>
      </div>
      <div class="feature-card">
        <span>📊</span>
        <h3>Track Progress</h3>
        <p>Monitor your tasks from Todo to In Progress to Done.</p>
      </div>
      <div class="feature-card">
        <span>🎯</span>
        <h3>Set Priorities</h3>
        <p>Organize tasks by Low, Medium or High priority.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.landing {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  background: #f0f2f5;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #6c63ff;
}

.nav-links { display: flex; gap: 20px; align-items: center; }

.nav-links a { text-decoration: none; color: #555; font-weight: 500; }

.hero {
  text-align: center;
  padding: 100px 20px 60px;
}

.hero h1 {
  font-size: 3rem;
  color: #1a1a2e;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero h1 span { color: #6c63ff; }

.hero p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.hero-btns { display: flex; gap: 16px; justify-content: center; }

.btn-primary {
  padding: 12px 28px;
  background: #6c63ff;
  color: white !important;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-primary:hover { background: #574fd6; }

.btn-outline {
  padding: 12px 28px;
  border: 2px solid #6c63ff;
  color: #6c63ff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-outline:hover { background: #6c63ff; color: white; }

.features {
  display: flex;
  gap: 24px;
  justify-content: center;
  padding: 40px 60px 80px;
  flex-wrap: wrap;
}

.feature-card {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  text-align: center;
  width: 260px;
}

.feature-card span { font-size: 2.5rem; }
.feature-card h3 { margin: 16px 0 8px; color: #1a1a2e; font-size: 1.1rem; }
.feature-card p { color: #888; font-size: 0.9rem; line-height: 1.5; }
</style>
