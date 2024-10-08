"""added mimetype and image name

Revision ID: 56700f246d8b
Revises: 7d59476d6dcc
Create Date: 2024-08-26 19:35:11.581943

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '56700f246d8b'
down_revision = '7d59476d6dcc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('places_images', schema=None) as batch_op:
        batch_op.add_column(sa.Column('mimetype', sa.String(length=50), nullable=False))
        batch_op.add_column(sa.Column('image_name', sa.String(length=50), nullable=False))

    with op.batch_alter_table('state_images', schema=None) as batch_op:
        batch_op.add_column(sa.Column('mimetype', sa.String(length=50), nullable=False))
        batch_op.add_column(sa.Column('image_name', sa.String(length=50), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('state_images', schema=None) as batch_op:
        batch_op.drop_column('image_name')
        batch_op.drop_column('mimetype')

    with op.batch_alter_table('places_images', schema=None) as batch_op:
        batch_op.drop_column('image_name')
        batch_op.drop_column('mimetype')

    # ### end Alembic commands ###
