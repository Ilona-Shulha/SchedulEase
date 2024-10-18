<template>
  <div class="top-bar">
    <div class="input-block">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#BCBCCB" viewBox="0 0 16 16"><path class="a" d="M12.7,11.23a6.777,6.777,0,0,0,1.4-4.174A7.02,7.02,0,0,0,7.1,0,7.105,7.105,0,0,0,0,7.056a7.105,7.105,0,0,0,7.1,7.056,6.667,6.667,0,0,0,4.2-1.391l3,2.981a.971.971,0,0,0,1.4,0,.957.957,0,0,0,0-1.391Zm-5.6.8A5.022,5.022,0,0,1,2,7.056a5.1,5.1,0,0,1,10.2,0A5.022,5.022,0,0,1,7.1,12.025Z"/></svg>
      <input class="top-bar-input" type="text" placeholder="Search transactions, invoices or help">
    </div>
    <div class="top-bar-nav">
      <span class="username">John Doe</span>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" fill="#a4afb7" viewBox="0 0 11 7"><path class="a" d="M8.1,11.6,2.6,6.041,4.026,4.6,8.1,8.718,12.174,4.6,13.6,6.041Z" transform="translate(-2.6 -4.6)"/></svg>
      </button>
      <div class="avatar">
        <img :src="require('@/assets/Avatar.png')" alt="Avatar" />
      </div>
    </div>
  </div>
</template>
<style scoped>
  .top-bar {
    padding: 26px 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .top-bar-input {
    position: relative;
    width: 234px;
    padding: 5px;
  }
  .input-block {
    display: flex;
    align-items: center;
  }
  .top-bar-nav {
    display: flex;
    align-items: center;
    gap: 13px;
  }
  .avatar {
    border-radius: 50%;
  }
  .username {
    color: #4D4F5C;
    font-size: 13px;
  }
</style>
