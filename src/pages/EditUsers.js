const EditUsers = () => {
  return (
    <div class="section-container default">
      <h1>Edit User Information</h1>
      <form
        class="default-form"
        action="./users-list.html"
        method="get"
        novalidate
      >
        <div>
          <label>Full Name</label>
          <input
            class="input-form"
            type="text"
            name="full-name"
            id="full-name"
          />
        </div>
        <div>
          <label>Email</label>
          <input class="input-form" type="email" name="email" id="email" />
        </div>
        <div>
          <input
            class="form-button edit-user-save-button"
            type="submit"
            value="Save"
            onclick="return saveEditUserInfo(fullName, email)"
          />
        </div>
      </form>
    </div>
  );
};

export default EditUsers;
