<template>
  <div class="calendar-container">
    <div class="calendar-view">
      <p class="calendar-view-title">Calendar View</p>
      <div class="calendar-btns">
        <button class="calendar-btn" :disabled="activeView === 'dayGridMonth'" @click="changeView('dayGridMonth')">Month</button>
        <button class="calendar-btn" :disabled="activeView === 'timeGridWeek'" @click="changeView('timeGridWeek')">Week</button>
        <button class="calendar-btn" :disabled="activeView === 'timeGridDay'" @click="changeView('timeGridDay')">Day</button>
        <button class="calendar-btn" :disabled="activeView === 'listWeek'" @click="changeView('listWeek')">Agenda</button>
      </div>
    </div>
    <div class="calendar-date">
      <div class="calendar-btns">
        <button class="calendar-btn" :disabled="isTodayDisabled" @click="goToToday">Today</button>
        <button class="calendar-btn" @click="goToPrev">Back</button>
        <button class="calendar-btn" @click="goToNext">Next</button>
      </div>
      <p class="calendar-date-title">{{ calendarTitle }}</p>
    </div>
    <FullCalendar
      ref="calendarRef"
      :options="calendarOptions"
    />
    <BasicPopup v-if="showEventPopup" :showPopup="showEventPopup" :style="modalStyle" ref="eventFormEl">
      <EventChanging :event="selectedEvent" :date="selectedDate" @cancel="deleteEvent" @close-popup="closeEventPopup" @change-event="(eventData)=>selectEventAction(eventData)" />
    </BasicPopup>
  </div>
</template>
<script setup>
  import { ref, computed, onMounted } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import { useStore } from 'vuex';
  import interactionPlugin from '@fullcalendar/interaction';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import listPlugin from '@fullcalendar/list';
  import { v4 as uuidv4 } from 'uuid';

  import EventChanging from '@/components/calendar/EventChanging.vue';
  import BasicPopup from '@/components/BasicPopup.vue';

  const store = useStore();
  const calendarRef = ref(null);
  const showEventPopup = ref(false);
  const selectedEvent = ref(null);
  const selectedDate = ref(null);
  const modalPosition = ref({ top: 0, left: 0 });
  const eventFormEl = ref(null);
  const isTodayDisabled = ref(false);
  const calendarTitle = ref('');
  const activeView = ref('dayGridMonth');
  const eventPopupAction = ref('add');

  const events = computed(() => store.getters.getEvents);

  const modalStyle = computed(() => ({
    top: `${modalPosition.value.top}px`,
    left: `${modalPosition.value.left}px`,
  }));


  const checkIfTodayDisabled = () => {
    const calendarApi = calendarRef.value.getApi();
    const currentViewStart = calendarApi.view.currentStart;
    const currentViewEnd= calendarApi.view.currentEnd;
    const currentDate = new Date();

    isTodayDisabled.value = currentViewStart < currentDate && currentDate < currentViewEnd;
  };

  const updateTitle = () => {
    calendarTitle.value = calendarRef.value.getApi().view.title;
  };

  const goToPrev = () => {
    calendarRef.value.getApi().prev();
    updateTitle();
    checkIfTodayDisabled();
  };

  const goToNext = () => {
    calendarRef.value.getApi().next();
    updateTitle();
    checkIfTodayDisabled();
  };

  const goToToday = () => {
    calendarRef.value.getApi().today();
    updateTitle();
    checkIfTodayDisabled();
  };

  const changeView = (view) => {
    const calendarApi = calendarRef.value.getApi();
    calendarApi.changeView(view);
    activeView.value = view;
    updateTitle();
    checkIfTodayDisabled();
  };

  const openEventPopup = (info) => {
    if (!info) return;
    selectedEvent.value = info.event ?? null;
    if (!selectedEvent.value) selectedDate.value = info.dateStr

    document.addEventListener('click', handleClickOutside);
    showEventPopup.value = true;
     const { clientY, clientX } = info.jsEvent;
     const viewportHeight = window.innerHeight;
     const eventBottomEdge = clientY + window.scrollY;
     const differenceBottom = viewportHeight - eventBottomEdge;
    const differenceTop = eventBottomEdge - 315;
    let topPosition = clientY + window.scrollY + 10;
    if (differenceTop < 0) topPosition = 10
    if (differenceBottom < 315) topPosition = viewportHeight -325
    modalPosition.value = {
      top: topPosition,
      left: clientX + window.scrollX - 100,
    };
  };
  const closeEventPopup = () => {
    showEventPopup.value = false;
    selectedEvent.value = null;
    document.removeEventListener('click', handleClickOutside);
  };

  const selectEventAction = (event) => {
    return eventPopupAction.value === 'add' ? addEvent(event) : changeEvent(event);
  }
  const addEvent = (data) => {
    const eventData = {...data, id: uuidv4()};

    const calendarApi = calendarRef.value.getApi();
    calendarApi.addEvent(eventData);
    store.dispatch('addEvent', eventData);
    closeEventPopup()
  };

  const changeEvent = (eventData) => {
    const calendarApi = calendarRef.value.getApi();
    const existingEvent = calendarApi.getEventById(eventData.id);
    if (existingEvent) {
      existingEvent.setProp('title', eventData.title);
      existingEvent.setDates(eventData.start, eventData.end);
      existingEvent.setExtendedProp('comment', eventData.comment);

      if(eventData.backgroundColor) {
        existingEvent.setProp('borderColor', eventData.borderColor);
        existingEvent.setProp('backgroundColor', eventData.backgroundColor);
      }
      store.dispatch('changeEvent', eventData);
    } else {
      addEvent(eventData);
    }

    closeEventPopup();
  };
  const deleteEvent = (eventId) => {
    if(eventId) {
      const calendarApi = calendarRef.value.getApi();
      const existingEvent = calendarApi.getEventById(eventId);
  
      if (existingEvent) {
        existingEvent.remove();
      }
      store.dispatch('deleteEvent', eventId);
    }
      closeEventPopup();
  };

  const handleClickOutside = (event) => {
    const dateCells = document.querySelectorAll('.fc-daygrid-day, .fc-timegrid-slot, .flatpickr, .fc-day, .fc-event');
    
    let clickedOnDateCell = false;
    dateCells.forEach((cell) => {
      if (cell.contains(event.target)) {
        clickedOnDateCell = true;
      }
    });
    
    if (!clickedOnDateCell && !event.target.closest('.event')) {
      closeEventPopup()
    }
  };


  const calendarOptions = {
    plugins: [listPlugin, interactionPlugin, dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    showNonCurrentDates: false,
    eventSources: [
      {
        events: events.value,
        color: 'blue',
        textColor: 'white'
      },
    ],
    dateClick: (info) => {
      eventPopupAction.value = 'add';
      openEventPopup(info);
    },
    eventClick: (info) => {
      eventPopupAction.value = 'change';
      openEventPopup(info);
    },
    nowIndicator: true,
    editable: true,
    eventDrop: (info) => {
      const updatedEvent = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
        comment: info.event.comment,
        backgroundColor: info.event.backgroundColor,
        borderColor: info.event.borderColor
      };

      store.dispatch('changeEvent', updatedEvent);
    },
  }
  onMounted(() => {
    updateTitle();
    checkIfTodayDisabled();
  });

</script>
<style scoped>
  .calendar-view-title {
    font-size: 18px;
    color: #4D4F5C;
  }
  .calendar-container {
    background-color: #fff;
    padding: 20px;
  }
  .calendar-view {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .calendar-date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .calendar-date-title {
    font-size: 18px;
    color: #4D4F5C;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>