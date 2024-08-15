import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, Flex, Button, useDisclosure } from "@chakra-ui/react";
import { CreateEventModal } from "../components/CreateEventModal";
import { UpdateEventModal } from "../components/UpdateEventModal";
import {
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
} from "../lib/api/calendarEvent";
import { getUser } from "../lib/api/auth.js";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  const [events, setEvents] = useState();
  const [updateTitle, setTitle] = useState("");
  const [updateDescription, setDescription] = useState("");
  const [updateStartDate, setStartDate] = useState("");
  const [updateEndDate, setEndDate] = useState("");
  const [eventId, setEventId] = useState("");
  const navigate = useNavigate();

  const clearEvents = async () => {
    try {
      const res = await getCalendarEvents();
      const calendarEvents = res.data.map((calendarEvent) => {
        return {
          eventId: calendarEvent.id,
          title: calendarEvent.title,
          description: calendarEvent.description,
          start: calendarEvent.startDate,
          end: calendarEvent.endDate,
        };
      });
      setEvents(calendarEvents);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const f = async () => {
      try {
        const getUserRes = await getUser();
        if (!getUserRes.data.isLogin) {
          navigate("/");
        }
        await clearEvents();
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [navigate]);

  const createEvent = async (event) => {
    await createCalendarEvent({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
    });
    await clearEvents();
  };
  const updateEvent = async (event) => {
    await updateCalendarEvent({
      calendarEventId: event.updateEventId,
      title: event.updateTitle,
      description: event.updateDescription,
      startDate: event.updateStartDate,
      endDate: event.updateEndDate,
    });
    await clearEvents();
  };
  const eventClick = (info) => {
    const zeroPad = (n) => {
      return n < 10 ? "0" + n : n;
    };
    const startDatetime = info.event.start;
    const endDatetime = info.event.end ? info.event.end : startDatetime;

    const startDate = `${startDatetime.getFullYear().toString()}-${zeroPad(
      startDatetime.getMonth() + 1
    )}-${zeroPad(startDatetime.getDate())}`;

    const endDate = `${endDatetime.getFullYear().toString()}-${zeroPad(
      endDatetime.getMonth() + 1
    )}-${zeroPad(endDatetime.getDate())}`;

    setTitle(info.event.title);
    setDescription(info.event.extendedProps.description);
    setStartDate(startDate);
    setEndDate(endDate);
    setEventId(info.event.extendedProps.eventId);
    onUpdateModalOpen();
  };

  return (
    <>
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        createEvent={createEvent}
      />
      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        onClose={onUpdateModalClose}
        updateEvent={updateEvent}
        updateTitle={updateTitle}
        updateDescription={updateDescription}
        updateStartDate={updateStartDate}
        updateEndDate={updateEndDate}
        updateEventId={eventId}
        setTitle={setTitle}
        setDescription={setDescription}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <Flex justifyContent="center" mt="16px">
        <Flex
          w="200px"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Button w="80%" colorScheme="blue" onClick={onCreateModalOpen}>
            予定を追加
          </Button>
        </Flex>
        <Box w="1200px">
          <FullCalendar
            plugins={[dayGridPlugin]}
            locale="ja"
            events={events}
            headerToolbar={{
              left: "today",
              center: "title",
              right: "prev,next",
            }}
            eventClick={eventClick}
            editable={true}
            selectable={true}
            height="95vh"
          />
        </Box>
      </Flex>
    </>
  );
};

export default Calendar;