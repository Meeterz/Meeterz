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
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        select: this.handleAvailSelect
      },
      eid: 0
    }
  },
  methods: {
    handleAvailSelect(selectInfo){
      let calendarApi = selectInfo.view.calendar;

      calendarApi.addEvent({
        id: this.eid++,
        title: 'available',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }
}
</script>
<template>

  <FullCalendar :options="calendarOptions" />
</template>


