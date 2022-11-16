<template>
  <div class="about">
  <div class="table__box">
    <div class="table__head">
      <p>Yo'nalishlar ro'yxati</p>
      <el-button type="primary" @click="toggle = !toggle, direction = {status:1}, editBtn = false">
        <el-icon><plus/></el-icon>
      </el-button>
    </div>
    <el-table :data="directions" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="Yo'nalish nomi"/>
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
    :title="`${editBtn?'Yo`nalishni tahrirlash':'Yangi yo`nalish'}`"
    width="30%"
  >
    <el-form
    :model="direction">
      <el-form-item label="Yangi yo'nalish nomi">
        <el-input v-model="direction.title" />
      </el-form-item>
      <el-form-item label="Yo'nalish holati">
        <el-switch v-model="direction.status" active-text="Aktiv" inactive-text="Noaktiv" :active-value="1" :inactive-value="0"/>
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
      direction: {},
      editBtn: false
    }
  },
  computed: {
    directions(){
      return this.$store.getters.directions
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
      this.$store.dispatch('addDirection', this.direction)
      this.toggle = false
      this.$message({
        message: "Muvaffaqiyatli qo'shildi!",
        type: "success"
      })
    },
    del(_id){
      this.$store.dispatch('delDirection', _id)
      this.$message({
        message: "Muvaffaqiyatli o'chirildi!",
        type: "success"
      })
    },
    edit(direction){
      this.direction = direction
      this.editBtn = true
      this.toggle = true
    },
    save(){
      this.$store.dispatch('saveDirection', this.direction)
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