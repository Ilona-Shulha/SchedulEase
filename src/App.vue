<template>
  <div class="layout">
    <div class="nav-panel">
      <NavPanel />
    </div>
    <div class="main-content">
      <div class="top-bar">
        <TopBar />
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopBar from '@/components/TopBar.vue';
import NavPanel from "@/components/NavPanel.vue";
import '@/assets/styles.css';

</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button {
    background: none;
    border: none;
  }

  input {
    border: none;
    outline: none;
  }

  .form-input {
    box-sizing: border-box;
    padding: 4px;
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid #D6D6D6;
  }
  .form-input:not(:first-of-type) {
    margin-top: 20px;
  }

  .form-input::placeholder {
    color: #D6D6D6;
  }

 .layout {
    display: flex;
    overflow: hidden;
  }

.nav-panel {
  width: 260px;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-bar {
  height: 70px;
  background-color: #fff;
  box-shadow: 0px 2px 6px #0000000A;
}

.content {
  flex: 1;
  overflow: auto;
  background: #F0F0F7;
  padding: 32px 75px;
}

.page-title {
  font-size: 28px;
  font-weight: normal;
  margin-bottom: 32px;
}

.calendar-btns {
  border-radius: 4px;
  box-shadow: 0px 2px 3px #0000000D;
}
.calendar-btn {
  cursor: pointer;
  padding: 7px 17px;
  border: #D7DAE2 1px solid ;
  color: #4D4F5C;
}
.calendar-btn:disabled {
  color: #3B86FF;
}
.calendar-btn:first-of-type {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.calendar-btn:last-of-type {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.calendar-btn:not(:first-of-type) {
  border-left: none;
}
  .fc-event {
    color: #fff;
    font-weight: 500 !important;
    padding: 6px 14px;
    background-color: #3B86FF;
  }
  .fc-day-today {
    background-color: #F5F6FA !important;
    border: 1px solid #EAF0F4 !important;
  }
  .fc-col-header {
    background-color: #F5F6FA;
    color: #A3A6B4;
    font-weight: bold;
    font-size: 11px;
    border-bottom: none !important;
  }
  .fc-now-indicator {
    background-color: #3B86FF !important;
  }
</style>
