import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Teacher } from '../../types/types';

const mockTeacher: Teacher = {
  id: '1',
  name: 'Pierre Martin',
  email: 'p.martin@universite.fr',
  phone: '+33 6 12 34 56 78',
  subject: 'Mathématiques',
  department: 'Sciences & Technologies',
  classes: ['Terminale A', 'Terminale B', 'Licence 3', '2ème Année', 'Master 1'],
};

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
  isEditing?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({
  icon,
  label,
  value,
  editable = false,
  onChangeText,
  isEditing,
}) => (
  <View style={profileStyles.infoRow}>
    <View style={profileStyles.infoIcon}>
      <Text style={profileStyles.infoIconText}>{icon}</Text>
    </View>
    <View style={profileStyles.infoContent}>
      <Text style={profileStyles.infoLabel}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          style={profileStyles.infoInput}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#9CA3AF"
        />
      ) : (
        <Text style={profileStyles.infoValue}>{value}</Text>
      )}
    </View>
  </View>
);

export default function ProfileScreen() {
  const [teacher, setTeacher] = useState<Teacher>(mockTeacher);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTeacher, setTempTeacher] = useState<Teacher>(mockTeacher);

  const handleSave = () => {
    setTeacher(tempTeacher);
    setIsEditing(false);
    Alert.alert('✅ Succès', 'Profil mis à jour avec succès !');
  };

  const handleCancel = () => {
    setTempTeacher(teacher);
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={profileStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={profileStyles.header}>
          <View style={profileStyles.avatarWrapper}>
            <View style={profileStyles.avatar}>
              <Text style={profileStyles.avatarText}>
                {teacher.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </Text>
            </View>
            <TouchableOpacity style={profileStyles.cameraBtn}>
              <Text style={profileStyles.cameraBtnText}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={profileStyles.headerName}>{teacher.name}</Text>
          <View style={profileStyles.badgeContainer}>
            <View style={profileStyles.badge}>
              <Text style={profileStyles.badgeText}>{teacher.subject}</Text>
            </View>
            <View style={[profileStyles.badge, profileStyles.badgeSecondary]}>
              <Text style={profileStyles.badgeTextSecondary}>
                {teacher.department}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={profileStyles.statsRow}>
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>{teacher.classes.length}</Text>
            <Text style={profileStyles.statLabel}>Classes</Text>
          </View>
          <View style={profileStyles.statDivider} />
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>18h</Text>
            <Text style={profileStyles.statLabel}>Hebdo</Text>
          </View>
          <View style={profileStyles.statDivider} />
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>165</Text>
            <Text style={profileStyles.statLabel}>Étudiants</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={profileStyles.section}>
          <View style={profileStyles.sectionHeader}>
            <Text style={profileStyles.sectionTitle}>Informations personnelles</Text>
            {!isEditing ? (
              <TouchableOpacity
                style={profileStyles.editBtn}
                onPress={() => setIsEditing(true)}
              >
                <Text style={profileStyles.editBtnText}>✏️ Modifier</Text>
              </TouchableOpacity>
            ) : (
              <View style={profileStyles.editActions}>
                <TouchableOpacity
                  style={profileStyles.cancelBtn}
                  onPress={handleCancel}
                >
                  <Text style={profileStyles.cancelBtnText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={profileStyles.saveBtn}
                  onPress={handleSave}
                >
                  <Text style={profileStyles.saveBtnText}>Sauvegarder</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={profileStyles.card}>
            <InfoRow
              icon="👤"
              label="Nom complet"
              value={isEditing ? tempTeacher.name : teacher.name}
              editable
              isEditing={isEditing}
              onChangeText={(text) =>
                setTempTeacher({ ...tempTeacher, name: text })
              }
            />
            <View style={profileStyles.divider} />
            <InfoRow
              icon="✉️"
              label="Email"
              value={isEditing ? tempTeacher.email : teacher.email}
              editable
              isEditing={isEditing}
              onChangeText={(text) =>
                setTempTeacher({ ...tempTeacher, email: text })
              }
            />
            <View style={profileStyles.divider} />
            <InfoRow
              icon="📱"
              label="Téléphone"
              value={isEditing ? tempTeacher.phone : teacher.phone}
              editable
              isEditing={isEditing}
              onChangeText={(text) =>
                setTempTeacher({ ...tempTeacher, phone: text })
              }
            />
            <View style={profileStyles.divider} />
            <InfoRow
              icon="📖"
              label="Matière"
              value={isEditing ? tempTeacher.subject : teacher.subject}
              editable
              isEditing={isEditing}
              onChangeText={(text) =>
                setTempTeacher({ ...tempTeacher, subject: text })
              }
            />
            <View style={profileStyles.divider} />
            <InfoRow
              icon="🏛️"
              label="Département"
              value={isEditing ? tempTeacher.department : teacher.department}
              editable
              isEditing={isEditing}
              onChangeText={(text) =>
                setTempTeacher({ ...tempTeacher, department: text })
              }
            />
          </View>
        </View>

        {/* Classes Section */}
        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Mes Classes</Text>
          <View style={profileStyles.card}>
            {teacher.classes.map((cls, index) => (
              <View key={index}>
                <View style={profileStyles.classRow}>
                  <View style={profileStyles.classIconBg}>
                    <Text style={profileStyles.classIcon}>🎓</Text>
                  </View>
                  <Text style={profileStyles.classText}>{cls}</Text>
                  <View style={profileStyles.classBadge}>
                    <Text style={profileStyles.classBadgeText}>Actif</Text>
                  </View>
                </View>
                {index < teacher.classes.length - 1 && (
                  <View style={profileStyles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Security Section */}
        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Sécurité</Text>
          <View style={profileStyles.card}>
            <TouchableOpacity style={profileStyles.actionRow}>
              <View style={[profileStyles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
                <Text>🔒</Text>
              </View>
              <Text style={profileStyles.actionText}>
                Changer le mot de passe
              </Text>
              <Text style={profileStyles.chevron}>›</Text>
            </TouchableOpacity>
            <View style={profileStyles.divider} />
            <TouchableOpacity style={profileStyles.actionRow}>
              <View style={[profileStyles.actionIcon, { backgroundColor: '#FEE2E2' }]}>
                <Text>🚪</Text>
              </View>
              <Text style={[profileStyles.actionText, { color: '#DC2626' }]}>
                Se déconnecter
              </Text>
              <Text style={profileStyles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const profileStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FF' },
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 24,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  avatarWrapper: { position: 'relative', marginBottom: 16 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#EEF2FF',
  },
  avatarText: { color: '#FFF', fontSize: 30, fontWeight: '800' },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cameraBtnText: { fontSize: 14 },
  headerName: { fontSize: 22, fontWeight: '800', color: '#1F2937' },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  badge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: { color: '#4F46E5', fontSize: 12, fontWeight: '700' },
  badgeSecondary: { backgroundColor: '#F0FDF4' },
  badgeTextSecondary: { color: '#059669', fontSize: 12, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: '#4F46E5' },
  statLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },
  statDivider: { width: 1, backgroundColor: '#E8ECF4' },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1F2937' },
  editBtn: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  editBtnText: { color: '#4F46E5', fontSize: 13, fontWeight: '600' },
  editActions: { flexDirection: 'row', gap: 8 },
  cancelBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  cancelBtnText: { color: '#6B7280', fontSize: 13, fontWeight: '600' },
  saveBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  saveBtnText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoIconText: { fontSize: 18 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '600', marginBottom: 4 },
  infoValue: { fontSize: 15, color: '#1F2937', fontWeight: '600' },
  infoInput: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '600',
    borderBottomWidth: 1.5,
    borderBottomColor: '#4F46E5',
    paddingBottom: 2,
  },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 16 },
  classRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  classIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  classIcon: { fontSize: 18 },
  classText: { flex: 1, fontSize: 15, color: '#1F2937', fontWeight: '600' },
  classBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  classBadgeText: { color: '#059669', fontSize: 11, fontWeight: '700' },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  actionText: { flex: 1, fontSize: 15, color: '#1F2937', fontWeight: '600' },
  chevron: { fontSize: 22, color: '#9CA3AF' },
});
