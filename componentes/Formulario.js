import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "shortid";

const Formulario = ({citas, setCitas, setMostrarForm}) => {

    const [paciente, setPaciente] = useState("")
    const [propietario, setPropietario] = useState("")
    const [telefono, setTelefono] = useState("")
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")
    const [sintomas, setSintomas] = useState("")

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = { year: "numeric", month: "long", day: "2-digit"}
        setFecha(date.toLocaleDateString('es-ES', opciones))
        hideDatePicker();
    }

    // muestra y oculta el timepicker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (hour) => {
        const opciones = { hour: "numeric", minute: "2-digit", hour12: true}
        setHora(hour.toLocaleString('es-ES', opciones))
        hideTimePicker();
    }

    const crearNuevaCita = () => {
        if(paciente.trim() === "" || propietario.trim() === "" || 
        telefono.trim() === "" || fecha.trim() == "" || hora.trim() == "" || sintomas.trim() == "") {
            // fallo la validación
            mostrarAlerta()
            return
        }

        const cita = {id: shortid.generate(), paciente, propietario, telefono, fecha, hora, sintomas}
        setCitas([...citas, cita])

        // Ocultar el formulario
        setMostrarForm(false)

        // Resetear el formulario

    }

    const mostrarAlerta = () => {
        Alert.alert(
            "Error", // titulo
            "Todos los campos son obligatorios", // descripcion
            [
                { text: "De acuerdo" } // arreglo de botones
            ]
        )
    }

    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={texto => console.log(texto)}
                        onChangeText={texto => setPaciente(texto)} 
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={texto => console.log(texto)}
                        onChangeText={texto => setPropietario(texto)} 
                    />
                </View>
                <View>
                    <Text style={styles.label}>Telefono de contacto:</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={texto => setTelefono(texto)} 
                        keyboardType="numeric"
                    />
                </View>

                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Selecciona una fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale="es_ES"
                        headerTextIOS="Elige una fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{fecha}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Selecciona una hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale="es_ES"
                        headerTextIOS="Elige una Hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{hora}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Sintomas:</Text>
                    <TextInput 
                        multiline
                        style={styles.input} 
                        onChangeText={texto => setSintomas(texto)}
                    />
                </View>

                <View>
                    <TouchableHighlight onPress={e => crearNuevaCita() } style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear nueva cita</Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    label: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: "#e1e1e1",
        borderWidth: 1,
        borderStyle: "solid"
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: "#7d024e",
        marginVertical: 10
    },
    textoSubmit: {
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default Formulario;