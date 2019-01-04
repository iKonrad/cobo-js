import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Base from 'templates/Default';
import { State, UserState } from 'types/redux';

interface StateProps {
    user: UserState,
}

const Profile = ({ user }: StateProps) => (
  <Base user={user}>
    <h1>Profile</h1>
    <Link to="c/straszne">GO</Link>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet fugit pariatur porro praesentium quis? Accusantium atque blanditiis facere illo nihil nostrum repellat repudiandae tempore. Aliquid asperiores consectetur corporis cum deserunt distinctio doloremque enim eos ex incidunt inventore ipsa magnam modi, molestiae molestias omnis porro quisquam quo soluta tempora tenetur vel voluptatem. Ab deserunt dolores ea eius eligendi iste labore laborum magnam minima molestiae, mollitia necessitatibus nihil, nobis odio officia provident quis ut voluptate? Accusantium alias aliquam cumque dignissimos fugit, neque nihil perferendis praesentium quibusdam quis quo repudiandae sapiente soluta velit veniam! Assumenda aut corporis deleniti deserunt exercitationem ipsa, nemo reprehenderit sequi tempora. Consequuntur cupiditate dolor et ex fuga repellat tenetur.</p>
  </Base>
);

const mapStateToProps = (state: State) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Profile);
