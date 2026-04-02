import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ScheduleEntry, DayOfWeek } from '../../types/types';

const DAYS: DayOfWeek[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

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
  {
    id: '7',
    subject: 'TD Algèbre',
    className: '2ème Année',
    room: 'Salle 205',
    day: 'Vendredi',
    startTime: '14:00',
    endTime: '16:00',
    color: '#7C3AED',
  },
];

const HOURS = Array.from({ length: 11 }, (_, i) => `${i + 8}:00`);

const getTopOffset = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return ((h - 8) * 60 + m) * (60 / 60);
};

const getDuration = (start: string, end: string): number => {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return ((eh - sh) * 60 + (em - sm));
};

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Lundi');
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');

  const daySchedule = mockSchedule.filter((e) => e.day === selectedDay);
  const totalWeekHours = mockSchedule.reduce((acc, e) => {
    return acc + getDuration(e.startTime, e.endTime) / 60;
  }, 0);

  return (
    <SafeAreaView style={schedStyles.container}>
      {/* Header */}
      <View style={schedStyles.header}>
        <View>
          <Text style={schedStyles.headerTitle}>📅 Emploi du temps</Text>
          <Text style={schedStyles.headerSubtitle}>
            Publié par l'administration
          </Text>
        </View>
        <View style={schedStyles.viewToggle}>
          <TouchableOpacity
            style={[
              schedStyles.toggleBtn,
              viewMode === 'list' && schedStyles.toggleBtnActive,
            ]}
            onPress={() => setViewMode('list')}
          >
            <Text
              style={[
                schedStyles.toggleBtnText,
                viewMode === 'list' && schedStyles.toggleBtnTextActive,
              ]}
            >
              ☰
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              schedStyles.toggleBtn,
              viewMode === 'timeline' && schedStyles.toggleBtnActive,
            ]}
            onPress={() => setViewMode('timeline')}
          >
            <Text
              style={[
                schedStyles.toggleBtnText,
                viewMode === 'timeline' && schedStyles.toggleBtnTextActive,
              ]}
            >
              📊
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Week Summary */}
      <View style={schedStyles.weekSummary}>
        <View style={schedStyles.weekSummaryItem}>
          <Text style={schedStyles.weekSummaryValue}>
            {mockSchedule.length}
          </Text>
          <Text style={schedStyles.weekSummaryLabel}>Séances</Text>
        </View>
        <View style={schedStyles.weekSummaryDivider} />
        <View style={schedStyles.weekSummaryItem}>
          <Text style={schedStyles.weekSummaryValue}>{totalWeekHours}h</Text>
          <Text style={schedStyles.weekSummaryLabel}>Total</Text>
        </View>
        <View style={schedStyles.weekSummaryDivider} />
        <View style={schedStyles.weekSummaryItem}>
          <Text style={schedStyles.weekSummaryValue}>
            {new Set(mockSchedule.map((e) => e.className)).size}
          </Text>
          <Text style={schedStyles.weekSummaryLabel}>Classes</Text>
        </View>
        <View style={schedStyles.weekSummaryDivider} />
        <View style={schedStyles.weekSummaryItem}>
          <Text style={schedStyles.weekSummaryValue}>
            {new Set(mockSchedule.map((e) => e.room)).size}
          </Text>
          <Text style={schedStyles.weekSummaryLabel}>Salles</Text>
        </View>
      </View>

      {/* Day Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={schedStyles.daySelector}
        contentContainerStyle={schedStyles.daySelectorContent}
      >
        {DAYS.map((day) => {
          const count = mockSchedule.filter((e) => e.day === day).length;
          return (
            <TouchableOpacity
              key={day}
              style={[
                schedStyles.dayBtn,
                selectedDay === day && schedStyles.dayBtnActive,
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text
                style={[
                  schedStyles.dayBtnText,
                  selectedDay === day && schedStyles.dayBtnTextActive,
                ]}
              >
                {day.substring(0, 3)}
              </Text>
              {count > 0 && (
                <View
                  style={[
                    schedStyles.dayBadge,
                    selectedDay === day && schedStyles.dayBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      schedStyles.dayBadgeText,
                      selectedDay === day && schedStyles.dayBadgeTextActive,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Content */}
      {viewMode === 'list' ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={schedStyles.listContainer}
        >
          {daySchedule.length > 0 ? (
            daySchedule
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((entry, index) => (
                <View key={entry.id} style={schedStyles.listItem}>
                  {/* Timeline connector */}
                  <View style={schedStyles.timelineCol}>
                    <View
                      style={[
                        schedStyles.timelineDot,
                        { backgroundColor: entry.color },
                      ]}
                    />
                    {index < daySchedule.length - 1 && (
                      <View style={schedStyles.timelineLine} />
                    )}
                  </View>

                  <View style={schedStyles.listTimeCol}>
                    <Text style={schedStyles.listStartTime}>
                      {entry.startTime}
                    </Text>
                    <Text style={schedStyles.listEndTime}>{entry.endTime}</Text>
                  </View>

                  <View
                    style={[
                      schedStyles.listCard,
                      { borderLeftColor: entry.color },
                    ]}
                  >
                    <View style={schedStyles.listCardHeader}>
                      <Text style={schedStyles.listCardSubject}>
                        {entry.subject}
                      </Text>
                      <View
                        style={[
                          schedStyles.durationBadge,
                          { backgroundColor: entry.color + '20' },
                        ]}
                      >
                        <Text
                          style={[
                            schedStyles.durationText,
                            { color: entry.color },
                          ]}
                        >
                          {getDuration(entry.startTime, entry.endTime) / 60}h
                        </Text>
                      </View>
                    </View>
                    <Text style={schedStyles.listCardClass}>
                      🎓 {entry.className}
                    </Text>
                    <Text style={schedStyles.listCardRoom}>
                      📍 {entry.room}
                    </Text>
                  </View>
                </View>
              ))
          ) : (
            <View style={schedStyles.emptyState}>
              <Text style={schedStyles.emptyIcon}>🎉</Text>
              <Text style={schedStyles.emptyTitle}>Journée libre !</Text>
              <Text style={schedStyles.emptySubtitle}>
                Aucun cours prévu ce jour
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        /* Timeline View */
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={schedStyles.timelineContainer}
        >
          <View style={schedStyles.timelineWrapper}>
            {/* Hours Column */}
            <View style={schedStyles.hoursCol}>
              {HOURS.map((hour) => (
                <View key={hour} style={schedStyles.hourRow}>
                  <Text style={schedStyles.hourText}>{hour}</Text>
                </View>
              ))}
            </View>

            {/* Events Column */}
            <View style={schedStyles.eventsCol}>
              {/* Hour lines */}
              {HOURS.map((hour) => (
                <View key={hour} style={schedStyles.hourLine} />
              ))}

              {/* Events */}
              {daySchedule.map((entry) => {
                const top = getTopOffset(entry.startTime);
                const height = getDuration(entry.startTime, entry.endTime);
                return (
                  <View
                    key={entry.id}
                    style={[
                      schedStyles.timelineEvent,
                      {
                        top,
                        height,
                        backgroundColor: entry.color + '20',
                        borderLeftColor: entry.color,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        schedStyles.timelineEventSubject,
                        { color: entry.color },
                      ]}
                      numberOfLines={1}
                    >
                      {entry.subject}
                    </Text>
                    <Text
                      style={schedStyles.timelineEventClass}
                      numberOfLines={1}
                    >
                      {entry.className}
                    </Text>
                    <Text
                      style={schedStyles.timelineEventRoom}
                      numberOfLines={1}
                    >
                      📍 {entry.room}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const schedStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1F2937' },
  headerSubtitle: { fontSize: 13, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 3,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  toggleBtnActive: { backgroundColor: '#FFF', elevation: 2 },
  toggleBtnText: { fontSize: 16, color: '#9CA3AF' },
  toggleBtnTextActive: { color: '#4F46E5' },
  weekSummary: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    marginBottom: 16,
  },
  weekSummaryItem: { flex: 1, alignItems: 'center' },
  weekSummaryValue: { fontSize: 20, fontWeight: '800', color: '#4F46E5' },
  weekSummaryLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '500',
  },
  weekSummaryDivider: { width: 1, backgroundColor: '#E5E7EB' },
  daySelector: {},
  daySelectorContent: { paddingHorizontal: 20, gap: 8 },
  dayBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  dayBtnActive: { backgroundColor: '#4F46E5' },
  dayBtnText: { fontSize: 13, fontWeight: '700', color: '#6B7280' },
  dayBtnTextActive: { color: '#FFF' },
  dayBadge: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dayBadgeActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  dayBadgeText: { fontSize: 11, color: '#4B5563', fontWeight: '700' },
  dayBadgeTextActive: { color: '#FFF' },
  listContainer: { padding: 20, paddingBottom: 40 },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timelineCol: {
    width: 20,
    alignItems: 'center',
    marginRight: 8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 14,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  listTimeCol: {
    width: 52,
    marginRight: 12,
    paddingTop: 10,
  },
  listStartTime: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  listEndTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '500',
  },
  listCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  listCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  listCardSubject: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
    flex: 1,
  },
  durationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  durationText: { fontSize: 12, fontWeight: '700' },
  listCardClass: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 3,
  },
  listCardRoom: { fontSize: 12, color: '#9CA3AF', fontWeight: '500' },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: { fontSize: 56 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
  timelineContainer: { padding: 20 },
  timelineWrapper: { flexDirection: 'row' },
  hoursCol: { width: 50 },
  hourRow: { height: 60, justifyContent: 'flex-start' },
  hourText: { fontSize: 11, color: '#9CA3AF', fontWeight: '600' },
  eventsCol: { flex: 1, position: 'relative' },
  hourLine: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  timelineEvent: {
    position: 'absolute',
    left: 4,
    right: 4,
    borderLeftWidth: 3,
    borderRadius: 8,
    padding: 8,
    overflow: 'hidden',
  },
  timelineEventSubject: {
    fontSize: 12,
    fontWeight: '800',
  },
  timelineEventClass: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
  },
  timelineEventRoom: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },
});
