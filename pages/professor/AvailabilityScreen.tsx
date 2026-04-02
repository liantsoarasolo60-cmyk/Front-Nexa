import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { TimeSlot, DayOfWeek } from '../../types/types';

const DAYS: DayOfWeek[] = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00',
];

const generateInitialSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  DAYS.forEach((day) => {
    TIME_SLOTS.forEach((time, index) => {
      if (index < TIME_SLOTS.length - 1) {
        slots.push({
          id: `${day}-${time}`,
          day,
          startTime: time,
          endTime: TIME_SLOTS[index + 1],
          isAvailable: false,
        });
      }
    });
  });
  return slots;
};

export default function AvailabilityScreen() {
  const [slots, setSlots] = useState<TimeSlot[]>(generateInitialSlots());
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Lundi');
  const [isSaved, setIsSaved] = useState(false);

  const toggleSlot = (id: string) => {
    setSlots(
      slots.map((slot) =>
        slot.id === id ? { ...slot, isAvailable: !slot.isAvailable } : slot
      )
    );
    setIsSaved(false);
  };

  const daySlots = slots.filter((slot) => slot.day === selectedDay);
  const availableCount = slots.filter((s) => s.isAvailable).length;
  const selectedDayAvailable = daySlots.filter((s) => s.isAvailable).length;

  const handleSave = () => {
    setIsSaved(true);
    Alert.alert(
      '✅ Disponibilités enregistrées',
      `Vos ${availableCount} créneaux ont été envoyés à l'administration.`
    );
  };

  const handleClearDay = () => {
    setSlots(
      slots.map((slot) =>
        slot.day === selectedDay ? { ...slot, isAvailable: false } : slot
      )
    );
    setIsSaved(false);
  };

  const handleSelectAllDay = () => {
    setSlots(
      slots.map((slot) =>
        slot.day === selectedDay ? { ...slot, isAvailable: true } : slot
      )
    );
    setIsSaved(false);
  };

  return (
    <SafeAreaView style={availStyles.container}>
      {/* Header */}
      <View style={availStyles.header}>
        <View>
          <Text style={availStyles.headerTitle}>🕐 Disponibilités</Text>
          <Text style={availStyles.headerSubtitle}>
            {availableCount} créneau{availableCount > 1 ? 'x' : ''} sélectionné
            {availableCount > 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={[availStyles.saveBtn, isSaved && availStyles.saveBtnSaved]}
          onPress={handleSave}
        >
          <Text style={availStyles.saveBtnText}>
            {isSaved ? '✓ Envoyé' : '📤 Envoyer'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Banner */}
      <View style={availStyles.infoBanner}>
        <Text style={availStyles.infoIcon}>💡</Text>
        <Text style={availStyles.infoText}>
          Sélectionnez vos créneaux disponibles pour la semaine
        </Text>
      </View>

      {/* Day Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={availStyles.dayTabs}
        contentContainerStyle={availStyles.dayTabsContent}
      >
        {DAYS.map((day) => {
          const count = slots.filter(
            (s) => s.day === day && s.isAvailable
          ).length;
          return (
            <TouchableOpacity
              key={day}
              style={[
                availStyles.dayTab,
                selectedDay === day && availStyles.dayTabActive,
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text
                style={[
                  availStyles.dayTabText,
                  selectedDay === day && availStyles.dayTabTextActive,
                ]}
              >
                {day.substring(0, 3)}
              </Text>
              {count > 0 && (
                <View
                  style={[
                    availStyles.dayTabBadge,
                    selectedDay === day && availStyles.dayTabBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      availStyles.dayTabBadgeText,
                      selectedDay === day && availStyles.dayTabBadgeTextActive,
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

      {/* Day Actions */}
      <View style={availStyles.dayActions}>
        <Text style={availStyles.dayTitle}>
          {selectedDay} — {selectedDayAvailable} créneau
          {selectedDayAvailable > 1 ? 'x' : ''}
        </Text>
        <View style={availStyles.dayActionsBtn}>
          <TouchableOpacity
            style={availStyles.actionMiniBtn}
            onPress={handleSelectAllDay}
          >
            <Text style={availStyles.actionMiniBtnText}>Tout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[availStyles.actionMiniBtn, availStyles.actionMiniBtnClear]}
            onPress={handleClearDay}
          >
            <Text style={availStyles.actionMiniBtnTextClear}>Effacer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Time Slots Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={availStyles.slotsContainer}
      >
        <View style={availStyles.slotsGrid}>
          {daySlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                availStyles.slotCard,
                slot.isAvailable && availStyles.slotCardActive,
              ]}
              onPress={() => toggleSlot(slot.id)}
              activeOpacity={0.7}
            >
              <View style={availStyles.slotTimeContainer}>
                <Text
                  style={[
                    availStyles.slotTime,
                    slot.isAvailable && availStyles.slotTimeActive,
                  ]}
                >
                  {slot.startTime}
                </Text>
                <Text
                  style={[
                    availStyles.slotTimeSeparator,
                    slot.isAvailable && availStyles.slotTimeActive,
                  ]}
                >
                  —
                </Text>
                <Text
                  style={[
                    availStyles.slotTime,
                    slot.isAvailable && availStyles.slotTimeActive,
                  ]}
                >
                  {slot.endTime}
                </Text>
              </View>
              <View
                style={[
                  availStyles.slotStatus,
                  slot.isAvailable && availStyles.slotStatusActive,
                ]}
              >
                <Text style={availStyles.slotStatusIcon}>
                  {slot.isAvailable ? '✓' : ''}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Weekly Summary */}
        <View style={availStyles.summary}>
          <Text style={availStyles.summaryTitle}>Récapitulatif de la semaine</Text>
          {DAYS.map((day) => {
            const count = slots.filter(
              (s) => s.day === day && s.isAvailable
            ).length;
            const daySlotsList = slots.filter(
              (s) => s.day === day && s.isAvailable
            );
            return (
              <View key={day} style={availStyles.summaryRow}>
                <Text style={availStyles.summaryDay}>{day}</Text>
                <View style={availStyles.summarySlots}>
                  {count > 0 ? (
                    <Text style={availStyles.summarySlotsText}>
                      {daySlotsList[0]?.startTime} -{' '}
                      {daySlotsList[daySlotsList.length - 1]?.endTime} ({count}h)
                    </Text>
                  ) : (
                    <Text style={availStyles.summaryEmpty}>Non disponible</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const availStyles = StyleSheet.create({
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
  saveBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  saveBtnSaved: { backgroundColor: '#059669' },
  saveBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  infoIcon: { fontSize: 18 },
  infoText: { flex: 1, fontSize: 13, color: '#4F46E5', fontWeight: '500' },
  dayTabs: { marginTop: 16 },
  dayTabsContent: { paddingHorizontal: 20, gap: 8 },
  dayTab: {
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
  dayTabActive: { backgroundColor: '#4F46E5' },
  dayTabText: { fontSize: 13, fontWeight: '700', color: '#6B7280' },
  dayTabTextActive: { color: '#FFF' },
  dayTabBadge: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dayTabBadgeActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  dayTabBadgeText: { fontSize: 11, color: '#4B5563', fontWeight: '700' },
  dayTabBadgeTextActive: { color: '#FFF' },
  dayActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  dayTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  dayActionsBtn: { flexDirection: 'row', gap: 8 },
  actionMiniBtn: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionMiniBtnClear: { backgroundColor: '#FEE2E2' },
  actionMiniBtnText: { color: '#4F46E5', fontSize: 12, fontWeight: '700' },
  actionMiniBtnTextClear: { color: '#DC2626', fontSize: 12, fontWeight: '700' },
  slotsContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  slotsGrid: {
    gap: 10,
  },
  slotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  slotCardActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  slotTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slotTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6B7280',
  },
  slotTimeSeparator: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  slotTimeActive: { color: '#4F46E5' },
  slotStatus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotStatusActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  slotStatusIcon: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  summary: {
    marginTop: 24,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  summaryDay: {
    width: 80,
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  summarySlots: { flex: 1 },
  summarySlotsText: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '600',
  },
  summaryEmpty: {
    fontSize: 13,
    color: '#D1D5DB',
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
