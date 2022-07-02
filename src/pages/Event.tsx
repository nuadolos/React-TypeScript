import { Button, Layout, Modal, Row } from "antd";
import { FC, useEffect, useState } from "react";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { IUser } from "../models/IUser";

const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { fetchGuests, createEvent, fetchEvents, deleteEvents } = useActions();
    const { guests, events } = useTypedSelector(state => state.event);
    const { user } = useTypedSelector(state => state.auth);

    useEffect(() => {
        fetchGuests();
        fetchEvents(user.username);
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        createEvent(event);
    }

    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify="center">
                <Button onClick={() => setModalVisible(true)}>Добавить событие</Button>
                <Button danger onClick={() => deleteEvents(user.username)}>Удалить события</Button>
            </Row>
            <Modal title="Добавить событие" visible={modalVisible}
                footer={null} onCancel={() => setModalVisible(false)}>
                <EventForm guests={guests} submit={addNewEvent} />
            </Modal>
        </Layout>
    );
}

export default Event;