<template>
  <div>
    <nav class="nav">
      <p class="logo">IMPEKABLE</p>
    <ul>
      <li>
        <router-link class="nav-route-link" to="/">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path class="a" d="M15.581,5.186l-7-5a1,1,0,0,0-1.162,0l-7,5A1,1,0,0,0,1.581,6.814L2,6.515V15a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1V6.515A1.7,1.7,0,0,0,15,7a1,1,0,0,0,.582-1.814ZM12,14H10V11a2,2,0,0,0-4,0v3H4V5.086L8,2.229l4,2.857Z" transform="translate(0)"/></svg>
          <span>Home</span>
        </router-link>
      </li>
      
      <li>
        <router-link class="nav-route-link" to="/inbox">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14"><path class="a" d="M15,1H1A1,1,0,0,0,0,2V14a1,1,0,0,0,1,1H15a1,1,0,0,0,1-1V2A1,1,0,0,0,15,1ZM14,13H2V6.723L7.5,9.868a1,1,0,0,0,.992,0L14,6.723Zm0-8.58L8,7.849,2,4.42V3H14Z" transform="translate(0 -1)"/></svg>
          <span>Inbox</span>
        </router-link>
      </li>
      <li>
        <router-link class="nav-route-link" to="/invoices">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16"><path class="a" d="M14,0H2A.945.945,0,0,0,1,1V16l3-2,2,2,2-2,2,2,2-2,3,2V1A.945.945,0,0,0,14,0ZM12,10H4V8h8Zm0-4H4V4h8Z" transform="translate(-1)"/></svg>
          <span>Invoices</span>
        </router-link>
      </li>
      <li>
        <router-link class="nav-route-link" to="/calendar">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path class="a" d="M2,5v9H14V5ZM13,2h2a.945.945,0,0,1,1,1V15a.945.945,0,0,1-1,1H1a.945.945,0,0,1-1-1V3A.945.945,0,0,1,1,2H3V1A.945.945,0,0,1,4,0,.945.945,0,0,1,5,1V2h6V1a1,1,0,0,1,2,0ZM12,12H10V10h2ZM9,12H7V10H9Zm3-3H10V7h2ZM9,9H7V7H9ZM6,12H4V10H6Z"/></svg>
          <span>Calendar</span>
        </router-link>
      </li>
      <li>
        <router-link class="nav-route-link" to="/help-center">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path class="a" d="M8,0a8,8,0,1,0,8,8A8.024,8.024,0,0,0,8,0ZM8,10a2,2,0,1,1,2-2A2.006,2.006,0,0,1,8,10ZM8,2a5.834,5.834,0,0,1,2.6.6L9.044,4.156a3.591,3.591,0,0,0-2.089,0L5.4,2.6A5.834,5.834,0,0,1,8,2ZM2,8a5.834,5.834,0,0,1,.6-2.6L4.156,6.956a3.591,3.591,0,0,0,0,2.089L2.6,10.6A5.834,5.834,0,0,1,2,8Zm6,6a5.834,5.834,0,0,1-2.6-.6l1.556-1.556a3.591,3.591,0,0,0,2.089,0L10.6,13.4A5.834,5.834,0,0,1,8,14Zm5.4-3.4L11.844,9.044a3.591,3.591,0,0,0,0-2.089L13.4,5.4a5.933,5.933,0,0,1,0,5.2Z"/></svg>
          <span>Help center</span>
        </router-link>
      </li>
      <li>
        <router-link class="nav-route-link" to="/settings">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path class="a" d="M13.3,5.2l1.1-2.1L13,1.7,10.9,2.8a3.582,3.582,0,0,0-1.1-.4L9,0H7L6.2,2.3a4.179,4.179,0,0,0-1,.4L3.1,1.6,1.6,3.1,2.7,5.2a4.179,4.179,0,0,0-.4,1L0,7V9l2.3.8c.1.4.3.7.4,1.1L1.6,13,3,14.4l2.1-1.1a3.582,3.582,0,0,0,1.1.4L7,16H9l.8-2.3c.4-.1.7-.3,1.1-.4L13,14.4,14.4,13l-1.1-2.1a3.582,3.582,0,0,0,.4-1.1L16,9V7l-2.3-.8A4.179,4.179,0,0,0,13.3,5.2ZM8,11A2.946,2.946,0,0,1,5,8,2.946,2.946,0,0,1,8,5a2.946,2.946,0,0,1,3,3A2.946,2.946,0,0,1,8,11Z"/></svg>
          <span>Settings</span>
        </router-link>
      </li>
    </ul>
  </nav>
  </div>
</template>
<script setup>
</script>
<style scoped>
.logo {
  background-color: #0000001A;
  height: 70px;
  padding: 25px 20px;
  font-weight: bold;
  letter-spacing: 3px;
}
  nav {
    font-size: 15px;
    height: 100%;
    top: 0;
    bottom: 0;
    padding: 0;
    background-color: #43425D;
    color: #fff;
    overflow-y: auto;
  }
  nav ul {
    height: 100vh;
    padding: 0;
    list-style: none;
  }
  nav li {
    height: 53px;
    margin-bottom: 6px;
  }

  nav li:hover .nav-icon{
    fill: #A3A0FB;
  }
  
  nav a {
    text-decoration: none;
    display: block;
    padding: 17px 25px;
    color: inherit;
    position: relative;
  }
  
  nav a::before {
    content: "";
    background-color: transparent;
    position: absolute;
    height: 53px;
    top: 0;
    left: 0;
    width: 5px;
    transition: background-color 0.3s ease;
  }
  nav a.router-link-exact-active::before {
    content: "";
    background-color: #A3A0FB;
  }

  nav a.router-link-exact-active .nav-icon{
    fill: #A3A0FB;
  }

  .nav-icon {
    fill: #A5A4BF;
    transition: fill 0.3s ease;
  }

  .nav-route-link {
    display: grid;
    grid-template-columns: 25px auto;
  }
</style>
