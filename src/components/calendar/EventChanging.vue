<template>
  <div class="event">
    <button class="close-btn" @click="handleCloseClick">
      <svg width="20" height="20" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_840_109)">
        <path d="M26.5868 21.9996L34.256 14.3304C35.2469 13.3396 35.2469 11.734 34.256 10.7432C33.2651 9.75228 31.6596 9.75228 30.6687 10.7432L22.9996 18.4132L15.3304 10.744C14.3396 9.75314 12.734 9.75314 11.7432 10.744C10.7523 11.7349 10.7523 13.3404 11.7432 14.3313L19.4123 22.0004L11.7432 29.6696C10.7523 30.6605 10.7523 32.266 11.7432 33.2568C12.734 34.2477 14.3396 34.2477 15.3304 33.2568L22.9996 25.5877L30.6687 33.2568C31.6596 34.2477 33.2651 34.2477 34.256 33.2568C35.2469 32.266 35.2469 30.6604 34.256 29.6696L26.5868 21.9996Z" fill="#D6D6D6"/>
        </g>
        <path d="M43 22C43 33.0036 33.8644 42 22.5 42C11.1356 42 2 33.0036 2 22C2 10.9964 11.1356 2 22.5 2C33.8644 2 43 10.9964 43 22Z" stroke="#D6D6D6" stroke-width="4"/>
        <defs>
        <clipPath id="clip0_840_109">
        <rect width="24" height="24" fill="white" transform="translate(11 10)"/>
        </clipPath>
        </defs>
      </svg>
    </button>
    <form>
      <input class="form-input" type="text" name="eventInfo" placeholder="event name" v-model="eventInfo">
      <span v-if="$v.eventInfo.$error" class="error-text">Field is required, max length is 30 characters</span>
      <input class="form-input" type="datetime-local" name="eventData" placeholder="event date" v-model="eventDate">
      <span v-if="$v.eventDate.$error" class="error-text">
        {{ $v.eventDate.minDateValue ? 'Invalid date' : '' }}
      </span>
      <input class="form-input" type="text" name="eventComment" placeholder="notes" v-model="eventComment">
      <span v-if="$v.eventComment.$error" class="error-text">Field is required</span>
      <Flatpickr
        class="form-input flatpickr"
        v-model="eventTime"
        :config="config"
        placeholder="event time"
      />
      <div class="color-block">
        <label class="color-title" for="event-color">Select event color:</label>
         <input 
           type="color" 
           id="event-color" 
           v-model="eventColor" 
         />
      </div>
    </form>
    <div class="form-btns">
      <button class="form-btn cancel-btn" :class="props.event ? 'uppercase-btn' : ''" @click="handleCancelClick">{{props.event ? 'Discard' : 'Cancel'}}</button>
      <button class="form-btn" :class="props.event ? 'uppercase-btn' : ''" @click="validateForm">{{props.event ? 'Edit' :'Save'}}</button>
    </div>  
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';
import Flatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
// eslint-disable-next-line no-undef
const props = defineProps(['event', 'date']);
// eslint-disable-next-line no-undef
const emits = defineEmits(['cancel','close-popup', 'change-event']);

const eventInfo = ref('');
const eventDate = ref('');
const eventTime = ref(null);
const eventColor = ref('#3B86FF');
const eventComment = ref('');

const minDateValue = (min) => (value) => {
  if (!value) return true;
  return new Date(value) >= min;
};

const rules = {
  eventInfo: { required, maxLength: maxLength(30) },
  eventDate: { minDateValue: minDateValue(new Date()) },
  eventComment: { required },
};


const $v = useVuelidate(rules, { eventInfo, eventDate, eventComment });

const validateForm = () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    console.log('Form validation error');
  } else {
    handleSaveClick()
  }
};

watch(() => [props.event, props.date], () => {
  createEventData();
});

const config = {
  enableTime: false,
  noCalendar: true,
  dateFormat: 'H:i',
  time_24hr: true,
  allowInput: true,
};

const handleCancelClick = () => {
  const id = props.event ? props.event.id : null;
  emits('cancel', id);
};
const handleCloseClick = () => {
  emits('close-popup');
};

const handleSaveClick = () => {
  const eventData = {
    title: eventInfo.value,
    start: eventDate.value,
    end: createEndDate(eventDate.value, eventTime.value).slice(0, 16),
    comment: eventComment.value,
    id: props.event?.id || null,
    backgroundColor: eventColor.value ?? '#3B86FF',
    borderColor: eventColor.value ?? '#3B86FF'
  }
  emits('change-event', eventData);
};


const createEndDate = (start, duration) => {
  const startDate = new Date(start);
  const endDate = new Date(startDate.getTime() + convertHoursToMilliseconds(duration));
  const timeZone = startDate.toString().match(/\((.*?)\)$/)[1];
  const endDateStr = endDate.toISOString().replace('Z', timeZone);

  return endDateStr;
};

const convertHoursToMilliseconds = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const milliseconds = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
  return milliseconds;
};

const calculateEventDuration = (event) => {
  if (!event?.end) return `24:00`;
  const start = new Date(event?.start);
  const end = new Date(event?.end);
  const diffInMilliseconds = end - start;

  const totalMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  if (totalMinutes < 1) return '00:30'

  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');

  return `${hours}:${minutes}`;
}

const convertDateToISOFormat = (dateString) => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - offset);
  return localDate.toISOString().slice(0, 16);
}

const createEventData = () => {
  eventInfo.value = props.event ? props.event.title : '';
  eventDate.value = props.event ? convertDateToISOFormat(props.event?.start) : props.date + 'T00:00';
  eventTime.value = props.event ? calculateEventDuration(props.event) : '00:30';
  eventColor.value = props?.event?.backgroundColor ? props?.event?.backgroundColor : '#3B86FF';
  eventComment.value = props.event ? props.event.extendedProps.comment : '';
};

onMounted(() => {
  createEventData();
});
</script>

<style scoped>
  .event {
    position: relative;
    padding: 22px 26px 25px;
  }
  .close-btn {
    position: absolute;
    top: 6px;
    right: 7px;
    cursor: pointer;
  }
  
  .cancel-btn {
    color: #FF5F5F;
  }
  .form-btns {
    margin-top: 38px;
    display: flex;
    justify-content: space-between;
  }
  .form-btn {
    cursor: pointer;
    font-size: 12px;
  }
  .color-title {
    color: #4D4F5C;
    font-size: 13px;
  }
  .color-block {
    display: flex;
    margin-top: 6px;
    justify-content: space-between;
  }
  .uppercase-btn {
    text-transform: uppercase;
  }
  .error-text {
    color:#FF5F5F;
    font-size: 11px;
  }
</style>