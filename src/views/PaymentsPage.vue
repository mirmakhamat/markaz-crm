<template>
  <div class="about">
  <div class="table__box">
    <div class="table__head">
      <p>To'lovlar ro'yxati</p>
      <el-button type="primary" @click="toggle = !toggle, payment = {status:1}, editBtn = false">
        <el-icon><plus/></el-icon>
      </el-button>
    </div>
    <el-table :data="payments" style="width: 100%">
      <el-table-column type="index" width="50" label="№"/>
      <el-table-column type="expand">
        <template #default="props">
          <el-table :data="props.row.historysumma" style="width: 90%; margin: auto" :border="true">
            <el-table-column prop="summa" label="To'lov summasi"/>
            <el-table-column prop="data" label="To'lov sanasi"/>
            <el-table-column prop="typepayment" label="To'lov turi"/>
            <el-table-column prop="comment" label="Izoh"/>
            <el-table-column label="Tahrirlash" width="130px">
              <template #default="scope">
                <el-popconfirm 
                  title="Rostdan ham o'chirmoqchimisiz?"
                  confirm-button-text="Ha"
                  cancel-button-text="Yo'q"
                  @confirm="delitem(scope.$index, props.row._id)">
                  <template #reference>
                    <el-button icon="Delete" circle type="danger"/>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="group.title" label="Guruh nomi"/>
      <el-table-column prop="pupil.name" label="O'quvchi ismi"/>
      <el-table-column label="Tahrirlash" width="130px">
        <template #default="scope">
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
    :title="`${editBtn?'To`lovni tahrirlash':'Yangi to`lov'}`"
    width="30%"
  >
    <el-form
    :model="payment">
      <el-form-item label="Guruh">
        <el-select v-model="payment.group" placeholder="Ro'yhatdan tanlang">
          <el-option
              v-for="item of groups"
              :key="item._id"
              :label="item.title"
              :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="O'quvchi">
        <el-select v-model="payment.pupil" placeholder="Ro'yhatdan tanlang">
          <el-option
              v-for="item of pupils"
              :key="item._id"
              :label="item.name"
              :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Summa">
        <el-input-number v-model="payment.summa"/>
      </el-form-item>
      <el-form-item label="Sana">
        <el-date-picker v-model="payment.data" type="date"/>
      </el-form-item>
      <el-form-item label="To'lov turi">
        <el-input v-model="payment.typepayment" placeholder="naxt, karta"/>
      </el-form-item>
      <el-form-item label="Izoh">
        <el-input v-model="payment.comment" type="textarea"/>
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
      payment: {},
      editBtn: false
    }
  },
  computed: {
    payments(){
      return this.$store.getters.payments
    },
    status(){
      return this.$store.getters.status
    },
    who(){
      return this.$store.getters.who
    },
    pupils(){
      return this.$store.getters.pupils.filter(pupil => pupil.group._id == this.payment.group)
    },
    groups(){
      return this.$store.getters.groups
    }
  },
  methods: {
    add(){
      this.$store.dispatch('addPayment', this.payment)
      this.toggle = false
      this.$message({
        message: "Muvaffaqiyatli qo'shildi!",
        type: "success"
      })
    },
    del(_id){
      this.$store.dispatch('delPayment', _id)
      this.$message({
        message: "Muvaffaqiyatli o'chirildi!",
        type: "success"
      })
    },
    edit(payment){
      this.payment = payment
      this.editBtn = true
      this.toggle = true
    },
    save(){
      this.$store.dispatch('savePayment', this.payment)
      this.toggle = false
      this.editBtn = false
      this.$message({
        message: "Muvaffaqiyatli saqlandi!",
        type: "success"
      })
    },
    delitem(index, _id){
      this.$store.dispatch('delPaymentId', {index, _id})
      this.$message({
        message: "Muvaffaqiyatli o'chirildi!",
        type: "success"
      })
    }
  },
}
</script>