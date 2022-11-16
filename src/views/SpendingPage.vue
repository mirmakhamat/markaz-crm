<template>
  <div class="about">
  <div class="table__box">
    <div class="table__head">
      <p>Chiqimlar ro'yxati</p>
      <el-button type="primary" @click="toggle = !toggle, spending = {}, editBtn = false">
        <el-icon><plus/></el-icon>
      </el-button>
    </div>
    <el-table :data="spendings" style="width: 100%" show-summary :summary-method="getTotal">
      <el-table-column type="index" width="50" />
      <el-table-column prop="summa" label="Summa">
        <template #defalut="scope">
          {{ scope.toLocaleString() }} so'm
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="Izoh"/>
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
    :title="`${editBtn?'Chiqim tahrirlash':'Yangi chiqim'}`"
    width="30%"
  >
    <el-form
    :model="spending">
      <el-form-item label="Chiqim summasi">
        <el-input-number v-model="spending.summa" min="0" placeholder="25000"/>
      </el-form-item>
      <el-form-item label="Izoh">
        <el-input v-model="spending.comment" type="textarea"/>
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
      spending: {},
      editBtn: false
    }
  },
  computed: {
    spendings(){
      return this.$store.getters.spendings
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
      this.$store.dispatch('addSpending', this.spending)
      this.toggle = false
      this.$message({
        message: "Muvaffaqiyatli qo'shildi!",
        type: "success"
      })
    },
    del(_id){
      this.$store.dispatch('delSpending', _id)
      this.$message({
        message: "Muvaffaqiyatli o'chirildi!",
        type: "success"
      })
    },
    edit(spending){
      this.spending = spending
      this.editBtn = true
      this.toggle = true
    },
    save(){
      this.$store.dispatch('saveSpending', this.spending)
      this.toggle = false
      this.editBtn = false
      this.$message({
        message: "Muvaffaqiyatli saqlandi!",
        type: "success"
      })
    },
    getTotal(param){
      const { columns, data } = param
      const sums = []
      let sum
      columns.forEach((column, index) => {
        if (index === 2) {
          sums[index - 1] = 'Umumiy summa'
          return
        }
        const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => Number.isNaN(value))) {
          sum = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!Number.isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      sums[2] = `${sum} so'm`
      return sums
    }
  }
}
</script>

<style lang="scss">

</style>