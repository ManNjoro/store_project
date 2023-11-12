"""Initial migration

Revision ID: 8373ecf2b5d6
Revises: 
Create Date: 2023-11-12 02:24:58.330478

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8373ecf2b5d6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('admin', schema=None) as batch_op:
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))

    with op.batch_alter_table('payments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('paid_at', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))

    with op.batch_alter_table('stores', schema=None) as batch_op:
        batch_op.add_column(sa.Column('store_name', sa.String(length=150), nullable=True))
        batch_op.add_column(sa.Column('store_pic', sa.LargeBinary(), nullable=True))
        batch_op.add_column(sa.Column('floor_number', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('opening_time', sa.TIME(), nullable=True))
        batch_op.add_column(sa.Column('closing_time', sa.TIME(), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))
        batch_op.drop_column('data')
        batch_op.drop_column('gender')
        batch_op.drop_column('size')
        batch_op.drop_column('category')
        batch_op.drop_column('name')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('updated_at')

    with op.batch_alter_table('stores', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=150), nullable=True))
        batch_op.add_column(sa.Column('category', sa.VARCHAR(length=20), nullable=True))
        batch_op.add_column(sa.Column('size', sa.VARCHAR(length=4), nullable=True))
        batch_op.add_column(sa.Column('gender', sa.VARCHAR(length=10), nullable=True))
        batch_op.add_column(sa.Column('data', sa.BLOB(), nullable=True))
        batch_op.drop_column('updated_at')
        batch_op.drop_column('closing_time')
        batch_op.drop_column('opening_time')
        batch_op.drop_column('floor_number')
        batch_op.drop_column('store_pic')
        batch_op.drop_column('store_name')

    with op.batch_alter_table('payments', schema=None) as batch_op:
        batch_op.drop_column('updated_at')
        batch_op.drop_column('paid_at')

    with op.batch_alter_table('admin', schema=None) as batch_op:
        batch_op.drop_column('updated_at')

    # ### end Alembic commands ###