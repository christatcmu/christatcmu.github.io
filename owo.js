$(document).ready(function() {
  $(".event").click(toggleEvent);
  var hash = document.location.hash;
  if ((hash !== "") && (hash !== "#")) {
    toggleEvent.call($("[data-hash='" + hash + "']"));
  }
});

function toggleEvent() {
  console.log(this);
  if ($(this).hasClass("event--hideinfo")) {
    /* hide any events that are already expanded */
    $(".event--showinfo").removeClass("event--showinfo").addClass("event--hideinfo");
    $(".infocard--event").fadeOut("slow", function() {
      $(this).remove();
    });

    /* show the new event */
    $(this).removeClass("event--hideinfo").addClass("event--showinfo");
    var $eventInfocard = $(document.createElement("div"));
    $eventInfocard.addClass("infocard--event");
    $eventInfocard.addClass($(this).attr("id") + "-infocard");
    $eventInfocard.append($(this).children(".event-time").clone());
    $eventInfocard.append($(this).children(".event-place").clone());
    $eventInfocard.append($(this).children(".event-desc").clone());
    $(".infocard").append($eventInfocard);
    $eventInfocard.fadeIn("slow");

    document.location.hash = $(this).attr("data-hash");
  }
  else {
    $(this).removeClass("event--showinfo").addClass("event--hideinfo");
    $(".infocard--event").fadeOut("fast", function() {
      $(this).remove();
      if (history.pushState) {
        history.pushState(null, null, "#");
      }
      else {
        document.location.hash = "";
      }
    });
  }
} 
