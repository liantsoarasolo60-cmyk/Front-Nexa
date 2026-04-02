import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ScheduleEntry, ClassGroup, DayOfWeek } from '../../types/types';

const DAYS: DayOfWeek[] = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
];

const mockSchedule: ScheduleEntry[] = [
  {
    id: '1',
    subject: 'Mathématiques',
    className: 'Terminale A',
    room: 'Salle 101',
    day: 'Lundi',
    startTime: '08:00',
    endTime: '10:00',
    color: '#4F46E5',
  },
  {
    id: '2',
    subject: 'Algèbre',
    className: '2ème Année',
    room: 'Amphi B',
    day: 'Lundi',
    startTime: '10:30',
    endTime: '12:30',
    color: '#7C3AED',
  },
  {
    id: '3',
    subject: 'Statistiques',
    className: 'Licence 3',
    room: 'Salle 205',
    day: 'Mardi',
    startTime: '14:00',
    endTime: '16:00',
    color: '#2563EB',
  },
  {
    id: '4',
    subject: 'Analyse',
    className: 'Master 1',
    room: 'Salle 310',
    day: 'Mercredi',
    startTime: '09:00',
    endTime: '11:00',
    color: '#059669',
  },
  {
    id: '5',
    subject: 'Probabilités',
    className: 'Licence 3',
    room: 'Salle 205',
    day: 'Jeudi',
    startTime: '13:00',
    endTime: '15:00',
    color: '#DC2626',
  },
  {
    id: '6',
    subject: 'Mathématiques',
    className: 'Terminale B',
    room: 'Salle 102',
    day: 'Vendredi',
    startTime: '08:00',
    endTime: '10:00',
    color: '#D97706',
  },
];

const mockClasses: ClassGroup[] = [
  { id: '1', name: 'Terminale A', studentCount: 32, level: 'Lycée' },
  { id: '2', name: 'Terminale B', studentCount: 28, level: 'Lycée' },
  { id: '3', name: 'Licence 3', studentCount: 45, level: 'Université' },
  { id: '4', name: '2ème Année', studentCount: 38, level: 'Université' },
  { id: '5', name: 'Master 1', studentCount: 22, level: 'Université' },
];

const today = new Date();
const dayNames: DayOfWeek[] = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];
const currentDayName: DayOfWeek =
  dayNames[today.getDay() === 0 ? 6 : today.getDay() - 1];

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(
    currentDayName || 'Lundi'
  );

  const filteredSchedule = mockSchedule.filter(
    (entry) => entry.day === selectedDay
  );

  const getDayShort = (day: DayOfWeek) => day.substring(0, 3);

  const totalHours = mockSchedule.reduce((acc, entry) => {
    const start = parseInt(entry.startTime.split(':')[0]);
    const end = parseInt(entry.endTime.split(':')[0]);
    return acc + (end - start);
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour 👋</Text>
            <Text style={styles.teacherName}>Prof. Martin</Text>
            <Text style={styles.dateText}>
              {today.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </Text>
          </View>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>PM</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statsContainer}
          contentContainerStyle={styles.statsContent}
        >
          <View style={[styles.statCard, { backgroundColor: '#4F46E5' }]}>
            <Text style={styles.statIcon}>📚</Text>
            <Text style={styles.statValue}>{mockClasses.length}</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#7C3AED' }]}>
            <Text style={styles.statIcon}>⏰</Text>
            <Text style={styles.statValue}>{totalHours}h</Text>
            <Text style={styles.statLabel}>Cette semaine</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#059669' }]}>
            <Text style={styles.statIcon}>👥</Text>
            <Text style={styles.statValue}>
              {mockClasses.reduce((a, c) => a + c.studentCount, 0)}
            </Text>
            <Text style={styles.statLabel}>Étudiants</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#DC2626' }]}>
            <Text style={styles.statIcon}>📋</Text>
            <Text style={styles.statValue}>{mockSchedule.length}</Text>
            <Text style={styles.statLabel}>Séances</Text>
          </View>
        </ScrollView>

        {/* Schedule Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Emploi du temps</Text>

          {/* Day Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daySelector}
          >
            {DAYS.map((day) => {
              const hasClasses = mockSchedule.some((e) => e.day === day);
              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDay === day && styles.dayButtonActive,
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      selectedDay === day && styles.dayTextActive,
                    ]}
                  >
                    {getDayShort(day)}
                  </Text>
                  {hasClasses && (
                    <View
                      style={[
                        styles.dot,
                        selectedDay === day && styles.dotActive,
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Schedule Cards */}
          {filteredSchedule.length > 0 ? (
            filteredSchedule.map((entry) => (
              <View key={entry.id} style={styles.scheduleCard}>
                <View
                  style={[styles.scheduleBar, { backgroundColor: entry.color }]}
                />
                <View style={styles.scheduleInfo}>
                  <Text style={styles.scheduleSubject}>{entry.subject}</Text>
                  <Text style={styles.scheduleClass}>{entry.className}</Text>
                  <View style={styles.scheduleDetails}>
                    <Text style={styles.scheduleDetail}>
                      🕐 {entry.startTime} - {entry.endTime}
                    </Text>
                    <Text style={styles.scheduleDetail}>
                      📍 {entry.room}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.scheduleTime,
                    { backgroundColor: entry.color + '15' },
                  ]}
                >
                  <Text style={[styles.scheduleTimeText, { color: entry.color }]}>
                    {parseInt(entry.endTime) - parseInt(entry.startTime)}h
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyDay}>
              <Text style={styles.emptyDayIcon}>🎉</Text>
              <Text style={styles.emptyDayText}>Pas de cours ce jour</Text>
            </View>
          )}
        </View>

        {/* Classes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎓 Mes Classes</Text>
          {mockClasses.map((cls) => (
            <View key={cls.id} style={styles.classCard}>
              <View style={styles.classIconContainer}>
                <Text style={styles.classIcon}>🏫</Text>
              </View>
              <View style={styles.classInfo}>
                <Text style={styles.className}>{cls.name}</Text>
                <Text style={styles.classLevel}>{cls.level}</Text>
              </View>
              <View style={styles.classStudents}>
                <Text style={styles.classStudentCount}>{cls.studentCount}</Text>
                <Text style={styles.classStudentLabel}>élèves</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  teacherName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 2,
  },
  dateText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 18,
  },
  statsContainer: {
    marginTop: 8,
  },
  statsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    width: 110,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 16,
  },
  daySelector: {
    marginBottom: 16,
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    minWidth: 56,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  dayButtonActive: {
    backgroundColor: '#4F46E5',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  dayTextActive: {
    color: '#FFF',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#4F46E5',
    marginTop: 4,
  },
  dotActive: {
    backgroundColor: '#FFF',
  },
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  scheduleBar: {
    width: 5,
  },
  scheduleInfo: {
    flex: 1,
    padding: 14,
  },
  scheduleSubject: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  scheduleClass: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 3,
    fontWeight: '500',
  },
  scheduleDetails: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  scheduleDetail: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  scheduleTime: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  scheduleTimeText: {
    fontSize: 16,
    fontWeight: '800',
  },
  emptyDay: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFF',
    borderRadius: 16,
  },
  emptyDayIcon: {
    fontSize: 40,
  },
  emptyDayText: {
    fontSize: 15,
    color: '#9CA3AF',
    marginTop: 12,
    fontWeight: '500',
  },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  classIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  classIcon: {
    fontSize: 22,
  },
  classInfo: {
    flex: 1,
    marginLeft: 14,
  },
  className: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  classLevel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 3,
    fontWeight: '500',
  },
  classStudents: {
    alignItems: 'center',
  },
  classStudentCount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4F46E5',
  },
  classStudentLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
