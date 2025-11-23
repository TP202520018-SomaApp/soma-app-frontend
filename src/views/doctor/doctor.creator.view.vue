<script>
import register from "@/services/authentication/register.service.js";
import sexes from "@/services/patients/sexes.values.js";
import poweredByGpt from "@/components/powered.by.gpt.component.vue";
import userRoles from "@/shared/data/user.roles.js";
//calc date of 18 years ago
const maxRegDate = new Date();
maxRegDate.setFullYear(maxRegDate.getFullYear() - 18);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default {
    name: "create doctor",
    emits: ['login'],
    components: {poweredByGpt},
    props: { universities: Array, specialities: Array },
    data() {
        return {
            emailRegex,
            maxRegDate,
            sexes,
            doctor: {
                role_id: userRoles.doctor,
                dni_ce: "",
                name: "",
                lastname: "",
                birthdate: null,
                sex: null,
                phone: "",
                email: "",
                username: "",
                password: "",
                repeatPassword: "",
                universityId: null,
                specialityId: null,
                egresateDate: null,
                cmp: "",
                rne: "",
            },
            doctor_errors: {
                dni_ce: false,
                name: false,
                lastname: false,
                birthdate: false,
                sex: false,
                phone: false,
                email: false,
                username: false,
                password: false,
                universityId: false,
                specialityId: false,
                egresateDate: false,
                cmp: false,
                rne: false,
            },

            processing: false,
        }
    },
    methods: {
        login(data = null){ this.$emit('login', data) },
        isString(value) { return typeof value === 'string'; },
        focusElement(id) {
            this.$nextTick(() => {
                const element = document.getElementById(id);
                if (!element) return;
                if (element.tagName === 'INPUT') {
                    element.focus();
                    element.select();
                } else {
                    const input = element.querySelector('input');
                    if (input) {
                        input.focus();
                        input.select();
                    } else { element.focus(); }
                }
            });
        },
        validateDoctorFields(silent = false) {
            for (const key in this.doctor_errors) this.doctor_errors[key] = false;

            const regSpecialChars = `!#%&%=*+\\-_.,:;?@<>()\\[\\]{}|^~¡¿°$€£¥₿`;
            const LowercaseRegex = /[a-zñáéíóú]/;
            const UppercaseRegex = /[A-ZÑÁÉÍÓÚ]/;
            const DigitRegex = /\d/;
            const SpecialCharRegex = new RegExp(`[${regSpecialChars}]`);
            const passwordRegex = new RegExp(
                `^(?=.*${DigitRegex.source})`+
                `(?=.*${LowercaseRegex.source})` +
                `(?=.*${UppercaseRegex.source})` +
                `(?=.*[${regSpecialChars}]).{8,}$`
            );

            if(!this.doctor.role_id) this.doctor.role_id = userRoles.doctor;
            if(!this.doctor.dni_ce){
                this.focusElement('dni_ce');
                if (silent) return false;
                this.doctor_errors.dni_ce = "El DNI o CE es requerido";
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'El DNI o CE es requerido',
                    life: 3000
                });
            }
            if(!(this.doctor.dni_ce.length === 8 || this.doctor.dni_ce.length === 20)){
                this.focusElement('dni_ce');
                if (silent) return false;
                this.doctor_errors.dni_ce = "El DNI o CE no es válido";
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'El DNI o CE no es válido',
                    life: 3000
                });
            }

            if (!this.doctor.name) {
                this.focusElement('name');
                if (silent) return false;
                this.doctor_errors.name = "El nombre es requerido";
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'El nombre es requerido',
                    life: 3000
                });
            }
            if (!this.doctor.lastname) {
                this.focusElement('lastname');
                if (silent) return false;
                this.doctor_errors.lastname = "El apellido es requerido";
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'El apellido es requerido',
                    life: 3000
                });
            }

            if(!this.doctor.birthdate){
                this.focusElement('birthdate');
                if (silent) return false;
                this.doctor_errors.birthdate = 'La fecha de nacimiento es requerida';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'La fecha de nacimiento es requerida',
                    life: 3000
                });
            }

            if(this.doctor.sex === null){
                this.focusElement('sex');
                if (silent) return false;
                this.doctor_errors.sex = 'El sexo es requerido';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'El sexo es requerido',
                    life: 3000
                });
            }

            if(!this.doctor.phone){
                this.focusElement('phone');
                if (silent) return false;
                this.doctor_errors.sex = 'El teléfono es requerido';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'El teléfono es requerido',
                    life: 3000
                });
            }

            if (!this.doctor.email) {
                this.focusElement('email');
                if (silent) return false;
                this.doctor_errors.email = 'El correo electrónico es requerido';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'El correo electrónico es requerido',
                    life: 3000
                });
            }
            if (!emailRegex.test(this.doctor.email)) {
                this.focusElement('email');
                if (silent) return false;
                this.doctor_errors.email = 'El correo electrónico no es valido';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'El correo electrónico no es valido',
                    life: 3000
                });
            }


            if (!this.doctor.username) {
                this.focusElement('username');
                if (silent) return false;
                this.doctor_errors.username = 'El usuario es requerido';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'El usuario es requerido',
                    life: 3000
                });
            }
            if (!this.doctor.password) {
                this.focusElement('password');
                if (silent) return false;
                this.doctor_errors.password = 'La contraseña es requerida';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'La contraseña es requerida',
                    life: 3000
                });
            }
            if(this.doctor.password.length < 8){
                this.focusElement('password');
                if (silent) return false;
                this.doctor_errors.password = 'Debe tener al menos 8 caracteres';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'La contraseña debe tener al menos 8 caracteres',
                    life: 3000
                });
            }

            if(!LowercaseRegex.test(this.doctor.password)) {
                this.focusElement('password');
                if (silent) return false;
                this.doctor_errors.password = 'Debe tener al menos una minúscula';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'La contraseña debe tener al menos una minúscula',
                    life: 3000
                });
            }
            if(!UppercaseRegex.test(this.doctor.password)) {
                this.focusElement('password');
                if (silent) return false;
                this.doctor_errors.password = 'Debe tener al menos una mayúscula';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'La contraseña debe tener al menos una mayúscula',
                    life: 3000
                });
            }
            if(!DigitRegex.test(this.doctor.password)) {
                this.focusElement('password');
                if (silent) return false;
                this.doctor_errors.password = 'Debe tener al menos un número';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'La contraseña debe tener al menos un número',
                    life: 3000
                });
            }
            if(!SpecialCharRegex.test(this.doctor.password)) {
                this.focusElement('password');
                if (silent) return false;
                this.doctor_errors.password = '<div>Debe tener al menos un caracter especial</div>' +
                    `<div>Lista: ${regSpecialChars.replace(/\\/g, '')}</div>`;
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'La contraseña debe tener al menos un carácter especial',
                    life: 3000
                });
            }
            
            
            if (!passwordRegex.test(this.doctor.password)) {
                this.focusElement('password');
                if (silent) return false;
                this.doctor_errors.password = '<div>Debe tener al menos 8 caracteres, una mayúscula,</div>' +
                    '<div>una minúscula, un número y un caracter especial</div>';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, ' +
                        'una minúscula, un numero y un carácter especial',
                    life: 3000
                });
            }


            if (!this.doctor.repeatPassword) {
                this.focusElement('repeatPassword');
                if (silent) return false;
                this.doctor_errors.repeatPassword = 'Debe repetir la contraseña';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'Debe repetir la contraseña',
                    life: 3000
                });
            }
            if (this.doctor.password !== this.doctor.repeatPassword) {
                this.focusElement('repeatPassword');
                if (silent) return false;
                this.doctor_errors.password = 'Las contraseñas no coinciden';
                this.doctor_errors.repeatPassword = 'Las contraseñas no coinciden';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'Las contraseñas no coinciden',
                    life: 3000
                });
            }


            if(!this.doctor.universityId){
                this.focusElement('university');
                if (silent) return false;
                this.doctor_errors.universityId = 'La universidad es requerida';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'La universidad es requerida',
                    life: 3000
                });
            }
            if(!this.doctor.egresateDate){
                this.focusElement('egresateDate');
                if (silent) return false;
                this.doctor_errors.egresateDate = 'La fecha de egreso es requerida';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'La fecha de egreso es requerida',
                    life: 3000
                });
            }
            if(!this.doctor.cmp){
                this.focusElement('cmp');
                if (silent) return false;
                this.doctor_errors.cmp = 'El CMP es requerido';
                return this.$toast.add({
                    severity: 'warn',
                    summary: 'Error al registrar',
                    detail: 'El código del Colegio Médico del Perú es requerido',
                    life: 3000
                });
            }

            return true;
        },

        async register() {
            if (!this.validateDoctorFields()) return;
            try {
                this.processing = true;
                let {response: doctor, error: doctorError} = await register(this.doctor)
                if (doctorError) {
                    this.stage = 0

                    for (const key in this.doctor_errors) this.doctor_errors[key] = true;

                    return this.$toast.add({
                        severity: 'warn',
                        summary: 'Error al registrar el doctor',
                        detail: doctorError,
                        life: 3000
                    });
                }
                localStorage.removeItem('create_doctor');
                this.login(doctor)
            }
            catch (e) { console.error(e) }
            finally { this.processing = false; }
        },
        back (){ this.$router.back() }
    },
    created() {
        let savedDoctor = localStorage.getItem('create_doctor');
        if (!savedDoctor) return;
        savedDoctor = JSON.parse(savedDoctor);
        if(savedDoctor.birthdate) savedDoctor.birthdate = new Date(savedDoctor.birthdate);
        else savedDoctor.birthdate = null;
        if(savedDoctor.egresateDate) savedDoctor.egresateDate = new Date(savedDoctor.egresateDate);
        else savedDoctor.egresateDate = null;
        this.doctor = savedDoctor;
        console.log('Restored data from localStorage', this.doctor);
    },
    watch: {
        doctor: {
            handler(newValue) {
                for (const key in this.doctor_errors) this.doctor_errors[key] = false;
                localStorage.setItem('create_doctor', JSON.stringify(newValue));
            },
            deep: true
        }
    }
}
</script>

<template>
    <div id="login">
        <div class="flex col center margin-top-3" v-motion-slide-bottom :duration="1000">
            <h1 class="white font-36px text-shadow">Regístrate</h1>
        </div>


        <div class="flex col center gap-1 margin-bottom-4">
            <div class="white font-19px text-shadow" v-motion-slide-bottom :duration="1000" :delay="200">
                Datos del doctor
            </div>
            <div class="flex col center gap-0-5">
                <div class="flex col center"  v-motion-slide-bottom :duration="1000" :delay="250">
                    <InputText v-model="doctor.dni_ce" placeholder="DNI o CE" maxlength="20"
                               :invalid="doctor_errors.dni_ce" id="dni_ce" class="white"/>
                    <div class="max-width red font-12px text-center" v-if="isString(doctor_errors.dni_ce)"
                         v-html="doctor_errors.dni_ce"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="300">
                    <InputText v-model="doctor.name" placeholder="Nombres" maxlength="100"
                               :invalid="doctor_errors.name" id="name" class="white"/>
                    <div class="max-width red font-12px text-center" v-if="isString(doctor_errors.name)"
                         v-html="doctor_errors.name"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="350">
                    <InputText v-model="doctor.lastname" placeholder="Apellidos" maxlength="100"
                               :invalid="doctor_errors.lastname" id="lastname" class="white"/>
                    <div class="max-width red font-12px text-center" v-if="isString(doctor_errors.lastname)"
                         v-html="doctor_errors.lastname"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="400">
                    <Calendar v-model="doctor.birthdate" placeholder="Fecha de Nacimiento" class="white"
                              :invalid="doctor_errors.birthdate" id="birthdate" :maxDate="maxRegDate"/>
                    <div class="red font-12px text-center" v-if="isString(doctor_errors.birthdate)"
                         v-html="doctor_errors.birthdate"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="450">
                    <Select id="sex" placeholder="Sexo" :invalid="doctor_errors.sex" class="white"
                            v-model="doctor.sex" :options="sexes" optionLabel="label" optionValue="value"/>
                    <div class="red font-12px text-center" v-if="isString(doctor_errors.sex)"
                         v-html="doctor_errors.sex"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="500">
                    <InputText v-model="doctor.phone" placeholder="Teléfono" v-keyfilter="/^[0-9\-+\s]+$/"
                               :invalid="doctor_errors.phone" id="phone" maxlength="30" class="white"/>
                    <div class="max-width red font-12px text-center" v-if="isString(doctor_errors.phone)"
                         v-html="doctor_errors.phone"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="550">
                    <InputText v-model="doctor.email" placeholder="Correo electrónico"
                               :invalid="doctor_errors.email" id="email" maxlength="100" class="white"/>
                    <div class="max-width red font-12px text-center" v-if="isString(doctor_errors.email)"
                         v-html="doctor_errors.email"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="600">
                    <InputText v-model="doctor.username" placeholder="Usuario" maxlength="100"
                               :invalid="doctor_errors.username" id="username" class="white"
                               v-keyfilter="/^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ_-]+$/"/>
                    <div class="max-width red font-12px text-center" v-if="isString(doctor_errors.username)"
                         v-html="doctor_errors.username"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="650">
                    <Password v-model="doctor.password" placeholder="Contraseña" toggleMask
                              class="white" :invalid="doctor_errors.password"
                              :feedback="false" id="password"/>
                    <div class="red font-12px text-center" v-if="isString(doctor_errors.password)"
                         v-html="doctor_errors.password"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="700">
                    <Password v-model="doctor.repeatPassword" placeholder="Repite la Contraseña"
                              toggleMask class="white" :invalid="doctor_errors.password"
                              :feedback="false" id="repeatPassword"/>
                    <div class="red font-12px text-center" v-if="isString(doctor_errors.repeatPassword)"
                         v-html="doctor_errors.repeatPassword"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="750">
                    <Select v-model="doctor.universityId" placeholder="Universidad" id="university" filter
                            :options="universities" optionLabel="name" optionValue="id" class="white"/>
                    <div class="red font-12px text-center" v-if="isString(doctor_errors.universityId)"
                            v-html="doctor_errors.universityId"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="800">
                    <Select v-model="doctor.specialityId" placeholder="Especialidad (Opcional)" id="speciality" filter
                            :options="specialities" optionLabel="name" optionValue="id" class="white"/>
                    <div class="red font-12px text-center" v-if="isString(doctor_errors.specialityId)"
                            v-html="doctor_errors.specialityId"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="850">
                    <Calendar v-model="doctor.egresateDate" placeholder="Fecha de Egreso" class="white"
                              id="egresateDate" :maxDate="maxRegDate"/>
                    <div class="red font-12px text-center" v-if="isString(doctor_errors.egresateDate)"
                         v-html="doctor_errors.egresateDate"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="900">
                    <InputText v-model="doctor.cmp" placeholder="Código del Colegio Médico del Perú (CMP)"
                               maxlength="20" :invalid="doctor_errors.cmp" id="cmp" class="white"/>
                    <div class="max-width red font-12px text-center" v-if="isString(doctor_errors.cmp)"
                         v-html="doctor_errors.cmp"/>
                </div>
                <div class="flex col center" v-motion-slide-bottom :duration="1000" :delay="950">
                    <InputText v-model="doctor.rne" placeholder="Registro Nacional de Especialistas (RNE) (Opcional)"
                               maxlength="20" :invalid="doctor_errors.rne" id="rne" class="white"/>
                    <div class="max-width red font-12px text-center" v-if="isString(doctor_errors.rne)"
                         v-html="doctor_errors.rne"/>
                </div>
            </div>
            
            <div class="flex col center text-button white" @click="login()"
                 v-motion-slide-bottom :duration="1000" :delay="1100">
                ¿Ya tienes una cuenta?
            </div>


            <div class="flex row gap-0-5" v-motion-slide-bottom :duration="1000" :delay="1300">
                <Button class="box-shadow login-button" severity="secondary"
                        @click="back" :disabled="processing">
                    Volver
                </Button>
                <Button class="box-shadow login-button" @click="register" :disabled="processing">
                    Registrarme
                </Button>
            </div>
        </div>
        <poweredByGpt color="white"/>
    </div>


</template>

<style scoped>
/*Define an animation*/
.text-shadow { text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25); }
.box-shadow { box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25); }
.login-button { width: 8rem; }

.white,
.white *,
.white input {
    color: white!important;
}
</style>