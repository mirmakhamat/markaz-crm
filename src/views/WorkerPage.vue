<template>
    <div class="about">
    <div class="table__box">
        <div class="table__head">
            <p>Ishchilar ro'yxati</p>
            <el-button type="primary" @click="toggle = !toggle, worker = {status: 1}, editBtn = false">
                <el-icon><plus/></el-icon>
            </el-button>
        </div>
        <el-table :data="workers" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="name" label="Ismi"/>
            <el-table-column prop="phone" label="Telefon raqam"/>
            <el-table-column label="Oyligi">
                <template #default="scope">
                    {{ scope.row.salary.toLocaleString() }} so'm
                </template>
            </el-table-column>
            <el-table-column label="Lavozimi">
                <template #default="scope">
                    {{ who[scope.row.who] }}
                </template>
            </el-table-column>
            <el-table-column label="Holati" width="130px">
                <template #default="scope">
                    <el-tag :type="`${scope.row.status ? 'success': 'danger'}`">{{ status[scope.row.status] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Tahrirlash" width="130px">
                <template #default="scope">
                    <el-button icon="Edit" @click="edit(scope.row)" circle type="warning"/>
                    <el-popconfirm 
                        title="Rostdan ham o'chirmoqchimisiz?"
                        confirm-button-text="Ha"
                        cancel-button-text="Yo'q"
                        @confirm="del(scope.row._id)">
                        <template #reference>
                            <el-button icon="Delete" circle type="danger"/>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        </div>
    </div>
    <el-dialog
        v-model="toggle"
        :title="`${editBtn?'Hodimni tahrirlash':'Yangi hodim'}`"
        width="30%"
    >
        <el-form
        :model="worker">
            <el-form-item label="Hodimning ismi">
                <el-input v-model="worker.name" />
            </el-form-item>
            <el-form-item label="Hodimning tel. raqami">
                <el-input v-model="worker.phone" />
            </el-form-item>
            <el-form-item label="Hodimning oyligi">
                <el-input v-model="worker.salary" />
            </el-form-item>
            <el-form-item label="Hodimning lavozmi">
                <el-select v-model="worker.who" placeholder="Ro'yhatdan tanlang">
                    <el-option
                        v-for="item, index of who"
                        :key="index"
                        :label="item"
                        :value="index"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Hodimnig holati">
                <el-switch v-model="worker.status" active-text="Aktiv" inactive-text="Noaktiv" :active-value="1" :inactive-value="0"/>
            </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="toggle = false">Bekor Qilish</el-button>
            <el-button type="primary" @click="add" v-if="!editBtn">Qo'shish</el-button>
            <el-button type="primary" @click="save" v-if="editBtn">Saqlash</el-button>
        </span>
        </template>
    </el-dialog>
</template>

<script>

export default {
    data() {
        return {
            toggle: false,
            worker: {},
            editBtn: false
        }
    },
    computed: {
        workers(){
            return this.$store.getters.workers
        },
        status(){
            return this.$store.getters.status
        },
        who(){
            return this.$store.getters.who
        }
    },
    methods: {
        add(){
            this.$store.dispatch('addWorker', this.worker)
            this.toggle = false
            this.$message({
                message: "Muvaffaqiyatli qo'shildi!",
                type: "success"
            })
        },
        del(_id){
            this.$store.dispatch('delWorker', _id)
            this.$message({
                message: "Muvaffaqiyatli o'chirildi!",
                type: "success"
            })
        },
        edit(worker){
            this.worker = worker
            this.editBtn = true
            this.toggle = true
        },
        save(){
            this.$store.dispatch('saveWorker', this.worker)
            this.toggle = false
            this.editBtn = false
            this.$message({
                message: "Muvaffaqiyatli saqlandi!",
                type: "success"
            })
        }
    },
}
</script>