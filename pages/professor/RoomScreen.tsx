import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Room } from '../../types/types';

const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Salle 101',
    capacity: 30,
    building: 'Bâtiment A',
    floor: 'RDC',
    equipment: ['Projecteur', 'Tableau blanc', 'WiFi'],
    status: 'available',
  },
  {
    id: '2',
    name: 'Amphi B',
    capacity: 150,
    building: 'Bâtiment B',
    floor: 'RDC',
    equipment: ['Micro', 'Projecteur HD', 'Climatisation'],
    status: 'occupied',
    reservedBy: 'Prof. Dupont',
    reservedUntil: '12:00',
  },
  {
    id: '3',
    name: 'Salle 205',
    capacity: 25,
    building: 'Bâtiment A',
    floor: '2ème',
    equipment: ['PC', 'Projecteur', 'Tableau interactif'],
    status: 'available',
  },
  {
    id: '4',
    name: 'Salle Info 1',
    capacity: 20,
    building: 'Bâtiment C',
    floor: '1er',
    equipment: ['20 PC', 'Réseau LAN', 'Projecteur'],
    status: 'reserved',
    reservedBy: 'Prof. Martin',
    reservedUntil: '16:00',
  },
  {
    id: '5',
    name: 'Salle 310',
    capacity: 35,
    building: 'Bâtiment A',
    floor: '3ème',
    equipment: ['Projecteur', 'Tableau blanc'],
    status: 'maintenance',
  },
  {
    id: '6',
    name: 'Amphi C',
    capacity: 200,
    building: 'Bâtiment D',
    floor: 'RDC',
    equipment: ['Système audio', 'Projecteur 4K', 'Climatisation'],
    status: 'available',
  },
];

const statusConfig = {
  available: {
    label: 'Disponible',
    color: '#059669',
    bg: '#D1FAE5',
    icon: '✅',
  },
  occupied: {
    label: 'Occupée',
    color: '#DC2626',
    bg: '#FEE2E2',
    icon: '🔴',
  },
  reserved: {
    label: 'Réservée',
    color: '#D97706',
    bg: '#FEF3C7',
    icon: '🟡',
  },
  maintenance: {
    label: 'Maintenance',
    color: '#6B7280',
    bg: '#F3F4F6',
    icon: '🔧',
  },
};

type FilterType = 'all' | Room['status'];

export default function RoomsScreen() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [reserveTime, setReserveTime] = useState({ start: '', end: '' });

  const filteredRooms =
    filter === 'all' ? rooms : rooms.filter((r) => r.status === filter);

  const handleReserve = () => {
    if (!reserveTime.start || !reserveTime.end) {
      Alert.alert('Erreur', 'Veuillez indiquer les horaires');
      return;
    }
    if (selectedRoom) {
      setRooms(
        rooms.map((r) =>
          r.id === selectedRoom.id
            ? {
                ...r,
                status: 'reserved',
                reservedBy: 'Prof. Martin',
                reservedUntil: reserveTime.end,
              }
            : r
        )
      );
    }
    setShowReserveModal(false);
    setReserveTime({ start: '', end: '' });
    Alert.alert(
      '✅ Réservation confirmée',
      `${selectedRoom?.name} réservée de ${reserveTime.start} à ${reserveTime.end}`
    );
  };

  const availableCount = rooms.filter((r) => r.status === 'available').length;

  return (
    <SafeAreaView style={roomsStyles.container}>
      {/* Header */}
      <View style={roomsStyles.header}>
        <View>
          <Text style={roomsStyles.headerTitle}>🚪 Salles</Text>
          <Text style={roomsStyles.headerSubtitle}>
            {availableCount} salle{availableCount > 1 ? 's' : ''} disponible
            {availableCount > 1 ? 's' : ''}
          </Text>
        </View>
        <View style={roomsStyles.headerStats}>
          <View style={roomsStyles.headerStatItem}>
            <Text style={roomsStyles.headerStatValue}>{rooms.length}</Text>
            <Text style={roomsStyles.headerStatLabel}>Total</Text>
          </View>
        </View>
      </View>

      {/* Status Legend */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={roomsStyles.filterBar}
        contentContainerStyle={roomsStyles.filterBarContent}
      >
        <TouchableOpacity
          style={[
            roomsStyles.filterChip,
            filter === 'all' && roomsStyles.filterChipActive,
          ]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              roomsStyles.filterChipText,
              filter === 'all' && roomsStyles.filterChipTextActive,
            ]}
          >
            🏫 Toutes ({rooms.length})
          </Text>
        </TouchableOpacity>
        {(Object.keys(statusConfig) as Room['status'][]).map((status) => {
          const config = statusConfig[status];
          const count = rooms.filter((r) => r.status === status).length;
          return (
            <TouchableOpacity
              key={status}
              style={[
                roomsStyles.filterChip,
                filter === status && roomsStyles.filterChipActive,
                filter === status && { backgroundColor: config.color },
              ]}
              onPress={() => setFilter(status as FilterType)}
            >
              <Text
                style={[
                  roomsStyles.filterChipText,
                  filter === status && roomsStyles.filterChipTextActive,
                ]}
              >
                {config.icon} {config.label} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Rooms List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={roomsStyles.roomsList}
      >
        {filteredRooms.map((room) => {
          const config = statusConfig[room.status];
          return (
            <TouchableOpacity
              key={room.id}
              style={roomsStyles.roomCard}
              onPress={() => {
                setSelectedRoom(room);
                if (room.status === 'available') {
                  setShowReserveModal(true);
                } else {
                  Alert.alert(
                    `${config.icon} ${room.name}`,
                    room.status === 'occupied' || room.status === 'reserved'
                      ? `Réservée par ${room.reservedBy} jusqu'à ${room.reservedUntil}`
                      : 'Cette salle est en maintenance'
                  );
                }
              }}
              activeOpacity={0.8}
            >
              {/* Room Header */}
              <View style={roomsStyles.roomHeader}>
                <View style={roomsStyles.roomIconContainer}>
                  <Text style={roomsStyles.roomIcon}>
                    {room.capacity > 100 ? '🏛️' : '🚪'}
                  </Text>
                </View>
                <View style={roomsStyles.roomTitleContainer}>
                  <Text style={roomsStyles.roomName}>{room.name}</Text>
                  <Text style={roomsStyles.roomLocation}>
                    {room.building} • {room.floor}
                  </Text>
                </View>
                <View style={[roomsStyles.statusBadge, { backgroundColor: config.bg }]}>
                  <Text style={[roomsStyles.statusText, { color: config.color }]}>
                    {config.icon} {config.label}
                  </Text>
                </View>
              </View>

              {/* Room Details */}
              <View style={roomsStyles.roomDetails}>
                <View style={roomsStyles.roomDetail}>
                  <Text style={roomsStyles.roomDetailIcon}>👥</Text>
                  <Text style={roomsStyles.roomDetailText}>
                    {room.capacity} places
                  </Text>
                </View>
                {room.reservedBy && (
                  <View style={roomsStyles.roomDetail}>
                    <Text style={roomsStyles.roomDetailIcon}>👤</Text>
                    <Text style={roomsStyles.roomDetailText}>
                      {room.reservedBy}
                    </Text>
                  </View>
                )}
                {room.reservedUntil && (
                  <View style={roomsStyles.roomDetail}>
                    <Text style={roomsStyles.roomDetailIcon}>🕐</Text>
                    <Text style={roomsStyles.roomDetailText}>
                      Jusqu'à {room.reservedUntil}
                    </Text>
                  </View>
                )}
              </View>

              {/* Equipment */}
              <View style={roomsStyles.equipmentContainer}>
                {room.equipment.map((eq, idx) => (
                  <View key={idx} style={roomsStyles.equipmentTag}>
                    <Text style={roomsStyles.equipmentText}>{eq}</Text>
                  </View>
                ))}
              </View>

              {/* Reserve Button */}
              {room.status === 'available' && (
                <View style={roomsStyles.reserveBtn}>
                  <Text style={roomsStyles.reserveBtnText}>
                    📅 Réserver cette salle
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Reserve Modal */}
      <Modal visible={showReserveModal} animationType="slide" transparent>
        <View style={roomsStyles.modalOverlay}>
          <View style={roomsStyles.modalContent}>
            <View style={roomsStyles.modalHeader}>
              <Text style={roomsStyles.modalTitle}>
                Réserver {selectedRoom?.name}
              </Text>
              <TouchableOpacity onPress={() => setShowReserveModal(false)}>
                <Text style={roomsStyles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={roomsStyles.modalRoomInfo}>
              <Text style={roomsStyles.modalRoomIcon}>
                {(selectedRoom?.capacity ?? 0) > 100 ? '🏛️' : '🚪'}
              </Text>
              <View>
                <Text style={roomsStyles.modalRoomName}>
                  {selectedRoom?.name}
                </Text>
                <Text style={roomsStyles.modalRoomLocation}>
                  {selectedRoom?.building} • {selectedRoom?.floor} •{' '}
                  {selectedRoom?.capacity} places
                </Text>
              </View>
            </View>

            <Text style={roomsStyles.modalLabel}>Heure de début</Text>
            <TextInput
              style={roomsStyles.modalInput}
              placeholder="Ex: 10:00"
              value={reserveTime.start}
              onChangeText={(text) =>
                setReserveTime({ ...reserveTime, start: text })
              }
              placeholderTextColor="#9CA3AF"
            />

            <Text style={roomsStyles.modalLabel}>Heure de fin</Text>
            <TextInput
              style={roomsStyles.modalInput}
              placeholder="Ex: 12:00"
              value={reserveTime.end}
              onChangeText={(text) =>
                setReserveTime({ ...reserveTime, end: text })
              }
              placeholderTextColor="#9CA3AF"
            />

            <View style={roomsStyles.modalActions}>
              <TouchableOpacity
                style={roomsStyles.modalCancelBtn}
                onPress={() => setShowReserveModal(false)}
              >
                <Text style={roomsStyles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={roomsStyles.modalConfirmBtn}
                onPress={handleReserve}
              >
                <Text style={roomsStyles.modalConfirmText}>
                  ✅ Confirmer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const roomsStyles = StyleSheet.create({
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
  headerStats: { alignItems: 'center' },
  headerStatItem: { alignItems: 'center' },
  headerStatValue: { fontSize: 24, fontWeight: '800', color: '#4F46E5' },
  headerStatLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '500' },
  filterBar: { marginBottom: 4 },
  filterBarContent: { paddingHorizontal: 20, gap: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  filterChipActive: { borderColor: 'transparent' },
  filterChipText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  filterChipTextActive: { color: '#FFF' },
  roomsList: { padding: 20, gap: 14 },
  roomCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  roomIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roomIcon: { fontSize: 22 },
  roomTitleContainer: { flex: 1 },
  roomName: { fontSize: 16, fontWeight: '800', color: '#1F2937' },
  roomLocation: { fontSize: 12, color: '#9CA3AF', marginTop: 2, fontWeight: '500' },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: { fontSize: 11, fontWeight: '700' },
  roomDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  roomDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roomDetailIcon: { fontSize: 13 },
  roomDetailText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  equipmentTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  equipmentText: { fontSize: 11, color: '#6B7280', fontWeight: '600' },
  reserveBtn: {
    marginTop: 12,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
  },
  reserveBtnText: { color: '#4F46E5', fontWeight: '700', fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
  modalClose: { fontSize: 20, color: '#9CA3AF' },
  modalRoomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    borderRadius: 14,
    padding: 14,
    gap: 14,
    marginBottom: 20,
  },
  modalRoomIcon: { fontSize: 32 },
  modalRoomName: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  modalRoomLocation: { fontSize: 12, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },
  modalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    marginTop: 14,
  },
  modalInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1F2937',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  modalCancelText: { color: '#6B7280', fontWeight: '700', fontSize: 15 },
  modalConfirmBtn: {
    flex: 2,
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  modalConfirmText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});
