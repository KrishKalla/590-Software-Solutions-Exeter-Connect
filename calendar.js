var inst = mobiscroll.eventcalendar('#demo-desktop-month-view', {
    theme: 'windows',
    themeVariant: 'light',
    clickToCreate: false,
    dragToCreate: false,
    dragToMove: false,
    dragToResize: false,
    eventDelete: false,
    view: {
        calendar: { labels: true }
    },
    onEventClick: function (event, inst) {
        mobiscroll.toast({
            message: event.event.title
        });
    }
});

mobiscroll.util.http.getJson('https://trial.mobiscroll.com/events/?vers=5', function (events) {
    inst.setEvents(events);
}, 'jsonp');