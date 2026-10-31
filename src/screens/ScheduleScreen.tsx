import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const days = [
  { id: 1, name: 'ПН' },
  { id: 2, name: 'ВТ' },
  { id: 3, name: 'СР' },
  { id: 4, name: 'ЧТ' },
  { id: 5, name: 'ПТ' },
];

const weeklySchedule: {
  [key: number]: {
    time: string;
    subject: string;
    teacher: string;
    room: string;
  }[];
} = {
  // ПОНЕДЕЛЬНИК
  1: [
    {
      time: '08:30 - 09:20',
      subject: 'Шет тілі 4',
      teacher: 'Сарсенбаева Ф.Г.',
      room: 'Корпус №5, О811',
    },
    {
      time: '10:30 - 11:20',
      subject: 'AppStorm — мобильді қосымшаларды әзірлеу',
      teacher: 'Зұпар А.М.',
      room: 'Корпус №5, О205',
    },
    {
      time: '11:30 - 12:20',
      subject: 'AppStorm — мобильді қосымшаларды әзірлеу',
      teacher: 'Зұпар А.М.',
      room: 'Корпус №5, О205',
    },
    {
      time: '13:00 - 13:50',
      subject: 'Философия',
      teacher: 'Канагатов М.К.',
      room: 'Онлайн сабақ',
    },
    {
      time: '15:00 - 15:50',
      subject: 'Дене шынықтыру 4',
      teacher: 'Оразова М.А.',
      room: 'ДС №1, Дом студентов',
    },
    {
      time: '16:00 - 16:50',
      subject: 'Дене шынықтыру 4',
      teacher: 'Оразова М.А.',
      room: 'ДС №1, Дом студентов',
    },
    {
      time: '17:00 - 17:50',
      subject: 'Қазақ (Орыс) тілі',
      teacher: 'Абдылдаева Ч.С.',
      room: 'Главный корпус, В513',
    },
  ],

  // ВТОРНИК
  2: [],

  // СРЕДА
  3: [
    {
      time: '08:30 - 09:20',
      subject: 'SQL мәліметтер базасы',
      teacher: 'Зұпар А.М.',
      room: 'Главный корпус, В309',
    },
    {
      time: '09:30 - 10:20',
      subject: 'SQL мәліметтер базасы',
      teacher: 'Зұпар А.М.',
      room: 'Главный корпус, В309',
    },
    {
      time: '15:00 - 15:50',
      subject: 'WEB бағдарламалау',
      teacher: 'Байтілес Р.Е.',
      room: 'Главный корпус, В102',
    },
    {
      time: '16:00 - 16:50',
      subject: 'WEB бағдарламалау',
      teacher: 'Байтілес Р.Е.',
      room: 'Главный корпус, В102',
    },
  ],

  // ЧЕТВЕРГ
  4: [
    {
      time: '10:30 - 11:20',
      subject: 'Веб-бағдарламалау құрылымдары',
      teacher: 'Байтілес Р.Е.',
      room: 'Корпус №5, О209',
    },
    {
      time: '11:30 - 12:20',
      subject: 'Веб-бағдарламалау құрылымдары',
      teacher: 'Байтілес Р.Е.',
      room: 'Корпус №5, О209',
    },
  ],

  // ПЯТНИЦА
  5: [
    {
      time: '08:30 - 09:20',
      subject: 'Философия',
      teacher: 'Курманбаева Л.Т.',
      room: 'Корпус №5, О604',
    },
    {
      time: '10:30 - 11:20',
      subject: 'Сұлбатехника',
      teacher: 'Ибекеев С.Е.',
      room: 'Корпус №5, О409',
    },
    {
      time: '11:30 - 12:20',
      subject: 'Сұлбатехника',
      teacher: 'Ибекеев С.Е.',
      room: 'Корпус №5, О409',
    },
  ],
};

export default function ScheduleScreen() {
  const today = new Date().getDay();

  const initialDay = today >= 1 && today <= 5 ? today : 1;

  const [selectedDay, setSelectedDay] = useState(initialDay);

  const selectedSchedule = weeklySchedule[selectedDay] || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Расписание</Text>
      <Text style={styles.subHeader}>
        Твоё расписание на неделю
      </Text>

      {/* ДНИ НЕДЕЛИ */}
      <View style={styles.daysContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day.id}
            style={[
              styles.dayButton,
              selectedDay === day.id && styles.activeDay,
            ]}
            onPress={() => setSelectedDay(day.id)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === day.id && styles.activeDayText,
              ]}
            >
              {day.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>
        {days[selectedDay - 1].name} — Занятия
      </Text>

      {/* СПИСОК ПРЕДМЕТОВ */}
      {selectedSchedule.length > 0 ? (
        selectedSchedule.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.time}>{item.time}</Text>

            <View style={styles.divider} />

            <Text style={styles.subject}>{item.subject}</Text>

            <Text style={styles.teacher}>
              👨‍🏫 {item.teacher}
            </Text>

            <Text style={styles.room}>
              📍 {item.room}
            </Text>
          </View>
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            🎉 Нет занятий
          </Text>
          <Text style={styles.emptyText}>
            Сегодня можно отдохнуть!
          </Text>
        </View>
      )}

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#252238',
    marginTop: 35,
  },
  subHeader: {
    fontSize: 14,
    color: '#77738A',
    marginTop: 6,
    marginBottom: 22,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  dayButton: {
    width: '18%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEBF5',
  },
  activeDay: {
    backgroundColor: '#6C4DE6',
    borderColor: '#6C4DE6',
  },
  dayText: {
    color: '#77738A',
    fontSize: 13,
    fontWeight: '700',
  },
  activeDayText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#252238',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EEEBF5',
  },
  time: {
    color: '#6C4DE6',
    fontSize: 13,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEBF5',
    marginVertical: 12,
  },
  subject: {
    color: '#252238',
    fontSize: 16,
    fontWeight: '700',
  },
  teacher: {
    color: '#77738A',
    fontSize: 13,
    marginTop: 9,
  },
  room: {
    color: '#77738A',
    fontSize: 13,
    marginTop: 7,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#252238',
  },
  emptyText: {
    fontSize: 13,
    color: '#77738A',
    marginTop: 8,
  },
  bottomSpace: {
    height: 30,
  },
});

