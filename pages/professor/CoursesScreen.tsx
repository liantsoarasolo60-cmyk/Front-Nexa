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
  Modal,
} from 'react-native';
import { Course, ClassGroup } from '../../types/types';

const mockClasses: ClassGroup[] = [
  { id: '1', name: 'Terminale A', studentCount: 32, level: 'Lycée' },
  { id: '2', name: 'Terminale B', studentCount: 28, level: 'Lycée' },
  { id: '3', name: 'Licence 3', studentCount: 45, level: 'Université' },
  { id: '4', name: '2ème Année', studentCount: 38, level: 'Université' },
  { id: '5', name: 'Master 1', studentCount: 22, level: 'Université' },
];

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction aux Intégrales',
    description: 'Cours complet sur le calcul intégral',
    classId: '1',
    className: 'Terminale A',
    fileName: 'integrales_ch1.pdf',
    uploadedAt: new Date('2024-01-15'),
    type: 'pdf',
  },
  {
    id: '2',
    title: 'Exercices - Dérivées',
    description: 'Série d\'exercices sur les dérivées',
    classId: '1',
    className: 'Terminale A',
    fileName: 'exercices_derivees.pdf',
    uploadedAt: new Date('2024-01-18'),
    type: 'document',
  },
  {
    id: '3',
    title: 'Algèbre Linéaire - Chapitre 2',
    description: 'Matrices et déterminants',
    classId: '4',
    className: '2ème Année',
    fileName: 'algebre_ch2.pdf',
    uploadedAt: new Date('2024-01-20'),
    type: 'pdf',
  },
  {
    id: '4',
    title: 'Vidéo - Théorème de Pythagore',
    description: 'Explication vidéo interactive',
    classId: '2',
    className: 'Terminale B',
    fileUrl: 'https://example.com/video',
    uploadedAt: new Date('2024-01-22'),
    type: 'video',
  },
];

const typeConfig = {
  pdf: { icon: '📄', color: '#DC2626', bg: '#FEE2E2', label: 'PDF' },
  video: { icon: '🎥', color: '#7C3AED', bg: '#EDE9FE', label: 'Vidéo' },
  link: { icon: '🔗', color: '#2563EB', bg: '#DBEAFE', label: 'Lien' },
  document: { icon: '📝', color: '#059669', bg: '#D1FAE5', label: 'Doc' },
};

export default function CoursesScreen() {
  const [selectedClass, setSelectedClass] = useState<ClassGroup | null>(null);
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    type: 'pdf' as Course['type'],
  });

  const filteredCourses = courses.filter((course) => {
    const matchesClass = selectedClass
      ? course.classId === selectedClass.id
      : true;
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleAddCourse = () => {
    if (!newCourse.title || !selectedClass) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
      return;
    }
    const course: Course = {
      id: Date.now().toString(),
      ...newCourse,
      classId: selectedClass.id,
      className: selectedClass.name,
      uploadedAt: new Date(),
    };
    setCourses([...courses, course]);
    setShowModal(false);
    setNewCourse({ title: '', description: '', type: 'pdf' });
    Alert.alert('✅ Succès', 'Cours envoyé avec succès !');
  };

  const handleDeleteCourse = (id: string) => {
    Alert.alert('Supprimer', 'Voulez-vous supprimer ce cours ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => setCourses(courses.filter((c) => c.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView style={coursesStyles.container}>
      {/* Header */}
      <View style={coursesStyles.header}>
        <View>
          <Text style={coursesStyles.headerTitle}>📚 Mes Cours</Text>
          <Text style={coursesStyles.headerSubtitle}>
            {filteredCourses.length} cours disponibles
          </Text>
        </View>
        <TouchableOpacity
          style={coursesStyles.addBtn}
          onPress={() => {
            if (!selectedClass) {
              Alert.alert('Info', 'Sélectionnez une classe d\'abord');
              return;
            }
            setShowModal(true);
          }}
        >
          <Text style={coursesStyles.addBtnText}>+ Ajouter</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={coursesStyles.searchContainer}>
        <Text style={coursesStyles.searchIcon}>🔍</Text>
        <TextInput
          style={coursesStyles.searchInput}
          placeholder="Rechercher un cours..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Class Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={coursesStyles.classFilter}
        contentContainerStyle={coursesStyles.classFilterContent}
      >
        <TouchableOpacity
          style={[
            coursesStyles.classChip,
            !selectedClass && coursesStyles.classChipActive,
          ]}
          onPress={() => setSelectedClass(null)}
        >
          <Text
            style={[
              coursesStyles.classChipText,
              !selectedClass && coursesStyles.classChipTextActive,
            ]}
          >
            Toutes
          </Text>
        </TouchableOpacity>
        {mockClasses.map((cls) => (
          <TouchableOpacity
            key={cls.id}
            style={[
              coursesStyles.classChip,
              selectedClass?.id === cls.id && coursesStyles.classChipActive,
            ]}
            onPress={() =>
              setSelectedClass(selectedClass?.id === cls.id ? null : cls)
            }
          >
            <Text
              style={[
                coursesStyles.classChipText,
                selectedClass?.id === cls.id &&
                  coursesStyles.classChipTextActive,
              ]}
            >
              {cls.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Courses List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={coursesStyles.coursesList}
      >
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const config = typeConfig[course.type];
            return (
              <View key={course.id} style={coursesStyles.courseCard}>
                <View style={[coursesStyles.courseTypeIcon, { backgroundColor: config.bg }]}>
                  <Text style={coursesStyles.courseTypeIconText}>{config.icon}</Text>
                </View>
                <View style={coursesStyles.courseInfo}>
                  <View style={coursesStyles.courseHeader}>
                    <Text style={coursesStyles.courseTitle} numberOfLines={1}>
                      {course.title}
                    </Text>
                    <View style={[coursesStyles.typeBadge, { backgroundColor: config.bg }]}>
                      <Text style={[coursesStyles.typeBadgeText, { color: config.color }]}>
                        {config.label}
                      </Text>
                    </View>
                  </View>
                  <Text style={coursesStyles.courseDescription} numberOfLines={2}>
                    {course.description}
                  </Text>
                  <View style={coursesStyles.courseMeta}>
                    <View style={coursesStyles.classTag}>
                      <Text style={coursesStyles.classTagText}>
                        🎓 {course.className}
                      </Text>
                    </View>
                    <Text style={coursesStyles.courseDate}>
                      {course.uploadedAt.toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={coursesStyles.deleteBtn}
                  onPress={() => handleDeleteCourse(course.id)}
                >
                  <Text style={coursesStyles.deleteBtnText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={coursesStyles.emptyState}>
            <Text style={coursesStyles.emptyIcon}>📭</Text>
            <Text style={coursesStyles.emptyTitle}>Aucun cours</Text>
            <Text style={coursesStyles.emptySubtitle}>
              Sélectionnez une classe et ajoutez des cours
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add Course Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={coursesStyles.modalOverlay}>
          <View style={coursesStyles.modalContent}>
            <View style={coursesStyles.modalHeader}>
              <Text style={coursesStyles.modalTitle}>Nouveau Cours</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={coursesStyles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={coursesStyles.modalLabel}>Classe cible</Text>
            <View style={coursesStyles.modalClassBadge}>
              <Text style={coursesStyles.modalClassText}>
                🎓 {selectedClass?.name}
              </Text>
            </View>

            <Text style={coursesStyles.modalLabel}>Titre du cours *</Text>
            <TextInput
              style={coursesStyles.modalInput}
              placeholder="Ex: Chapitre 3 - Intégrales"
              value={newCourse.title}
              onChangeText={(text) => setNewCourse({ ...newCourse, title: text })}
              placeholderTextColor="#9CA3AF"
            />

            <Text style={coursesStyles.modalLabel}>Description</Text>
            <TextInput
              style={[coursesStyles.modalInput, coursesStyles.modalTextArea]}
              placeholder="Description du cours..."
              value={newCourse.description}
              onChangeText={(text) =>
                setNewCourse({ ...newCourse, description: text })
              }
              multiline
              numberOfLines={3}
              placeholderTextColor="#9CA3AF"
            />

            <Text style={coursesStyles.modalLabel}>Type de contenu</Text>
            <View style={coursesStyles.typeSelector}>
              {(Object.keys(typeConfig) as Course['type'][]).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    coursesStyles.typeOption,
                    newCourse.type === type && coursesStyles.typeOptionActive,
                  ]}
                  onPress={() => setNewCourse({ ...newCourse, type })}
                >
                  <Text style={coursesStyles.typeOptionIcon}>
                    {typeConfig[type].icon}
                  </Text>
                  <Text
                    style={[
                      coursesStyles.typeOptionText,
                      newCourse.type === type &&
                        coursesStyles.typeOptionTextActive,
                    ]}
                  >
                    {typeConfig[type].label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={coursesStyles.uploadArea}
              onPress={() => Alert.alert('Info', 'Sélection de fichier...')}
            >
              <Text style={coursesStyles.uploadIcon}>📎</Text>
              <Text style={coursesStyles.uploadText}>
                Appuyer pour sélectionner un fichier
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={coursesStyles.submitBtn}
              onPress={handleAddCourse}
            >
              <Text style={coursesStyles.submitBtnText}>
                📤 Envoyer aux étudiants
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const coursesStyles = StyleSheet.create({
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
  addBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#1F2937' },
  classFilter: { marginTop: 16 },
  classFilterContent: { paddingHorizontal: 20, gap: 8 },
  classChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  classChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  classChipText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  classChipTextActive: { color: '#FFF' },
  coursesList: { padding: 20, gap: 12 },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    alignItems: 'flex-start',
  },
  courseTypeIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  courseTypeIconText: { fontSize: 22 },
  courseInfo: { flex: 1 },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  courseTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  typeBadgeText: { fontSize: 10, fontWeight: '700' },
  courseDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 8,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  classTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  classTagText: { fontSize: 11, color: '#4F46E5', fontWeight: '600' },
  courseDate: { fontSize: 11, color: '#9CA3AF', fontWeight: '500' },
  deleteBtn: { padding: 6 },
  deleteBtnText: { fontSize: 18 },
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
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#1F2937' },
  modalClose: { fontSize: 20, color: '#9CA3AF' },
  modalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    marginTop: 14,
  },
  modalClassBadge: {
    backgroundColor: '#EEF2FF',
    padding: 12,
    borderRadius: 12,
  },
  modalClassText: { fontSize: 14, color: '#4F46E5', fontWeight: '700' },
  modalInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1F2937',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  modalTextArea: { height: 80, textAlignVertical: 'top' },
  typeSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  typeOption: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  typeOptionActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  typeOptionIcon: { fontSize: 22 },
  typeOptionText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '600',
  },
  typeOptionTextActive: { color: '#4F46E5' },
  uploadArea: {
    marginTop: 14,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  uploadIcon: { fontSize: 28 },
  uploadText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 8,
    fontWeight: '500',
  },
  submitBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
