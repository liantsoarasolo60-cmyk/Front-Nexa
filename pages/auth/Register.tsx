import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("professeur");

  // États pour les labels flottants
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleRegister = () => {
    if (!email || !password || !firstName || !lastName) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    const data = { email, password, firstName, lastName, role };
    console.log("register", data);
    // TODO: appeler le service d'inscription
  };

  // Composant Input avec label flottant
  const FloatingLabelInput = ({
    label,
    value,
    onChangeText,
    isFocused,
    onFocus,
    onBlur,
    ...props
  }: any) => (
    <View style={styles.inputContainer}>
      <Text
        style={[
          styles.floatingLabel,
          (isFocused || value) && styles.floatingLabelActive,
        ]}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.input}
        {...props}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      {/* Première ligne : Prénom et Nom côte à côte */}
      <View style={styles.row}>
        <View style={styles.halfInput}>
          <FloatingLabelInput
            label="Prénom"
            value={firstName}
            onChangeText={setFirstName}
            isFocused={firstNameFocus}
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
          />
        </View>
        <View style={styles.halfInput}>
          <FloatingLabelInput
            label="Nom"
            value={lastName}
            onChangeText={setLastName}
            isFocused={lastNameFocus}
            onFocus={() => setLastNameFocus(true)}
            onBlur={() => setLastNameFocus(false)}
          />
        </View>
      </View>

      {/* Deuxième ligne : Email pleine largeur */}
      <View style={styles.fullInput}>
        <FloatingLabelInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          isFocused={emailFocus}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
      </View>

      {/* Troisième ligne : Mot de passe pleine largeur */}
      <View style={styles.fullInput}>
        <FloatingLabelInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          isFocused={passwordFocus}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
      </View>

      {/* Quatrième ligne : Rôle pleine largeur */}
      <View style={styles.fullInput}>
        <Text style={styles.label}>Rôle</Text>

        <Picker
          selectedValue={role}
          onValueChange={(value: string) => setRole(value)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Professeur" value="professeur" />
          <Picker.Item label="Etudiant" value="etudiant" />
        </Picker>
      </View>

      {/* Bouton pleine largeur */}
      <View style={styles.fullInput}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 30,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  halfInput: {
    width: "48%",
  },
  fullInput: {
    width: "100%",
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    position: "relative",
  },
  floatingLabel: {
    position: "absolute",
    left: 14,
    top: 15,
    fontSize: 16,
    color: "#666",
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  floatingLabelActive: {
    top: -8,
    fontSize: 12,
    color: "#000",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    paddingHorizontal: 14,
    color: "#000",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    width: "100%",
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    color: "#666",
    paddingHorizontal: 16,
    paddingTop: 4,
    fontWeight: "600",
  },
  picker: {
    width: "100%",
    height: 40,
    color: "#000",
    fontSize: 16,
  },
  pickerItem: {
    fontSize: 16,
    color: "#000",
  },
  button: {
    width: "100%",
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
