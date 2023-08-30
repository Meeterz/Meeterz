<script>
import FullCalendar from '@fullcalendar/vue3'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ resourceTimelinePlugin, interactionPlugin, timeGridPlugin],
        initialView: 'timeGridWeek',
        selectMirror: true,
        selectable: true,
        unselectAuto: false,
        eventOverlap: false,
        selectOverlap: true,
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        select: this.handleAvailSelect
      },
      eid: 0 //should probably load this from the db
    }
  },
  methods: {
    handleAvailSelect(selectInfo){
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect();
      var event = {
        id: this.eid++,
        title: 'available',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      //returns false if there's no overlap, but otherwise will return an event id of an overlapping event
      var overlap = this.mergeOverlap(event, calendarApi);
      console.log(overlap);
      if(overlap === false){
        calendarApi.addEvent(event);
      }
      else{
        calendarApi.getEventById(overlap).remove();
        calendarApi.addEvent(event);

      }
      this.$emit('avail-updated', calendarApi.getEvents());
    },
      mergeOverlap(event, calendar){
      // "calendar" on line below should ref the element on which fc has been called 
      var array = calendar.getEvents();
      for(let i in array){
          if (Date.parse(event.end) >= Date.parse(array[i].start) && Date.parse(event.start) <= Date.parse(array[i].end)){
            event.start = Date.parse(event.start) < Date.parse(array[i].start) ? event.start : array[i].start;
            event.end = Date.parse(event.end) > Date.parse(array[i].end) ? event.end : array[i].end;
            return array[i].id;
          }
      }
      return false;
    },
  }
}
</script>
<template>

  <FullCalendar :options="calendarOptions" :eventOverlap = false />
</template>


