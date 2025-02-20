PGDMP      8    
             }         	   sound_web    16.4    16.4 2    ,           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            -           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            .           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            /           1262    17522 	   sound_web    DATABASE     |   CREATE DATABASE sound_web WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE sound_web;
                postgres    false            �            1259    17652    authors    TABLE     c   CREATE TABLE public.authors (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);
    DROP TABLE public.authors;
       public         heap    postgres    false            �            1259    17651    authors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.authors_id_seq;
       public          postgres    false    222            0           0    0    authors_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;
          public          postgres    false    221            �            1259    17643    genres    TABLE     b   CREATE TABLE public.genres (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);
    DROP TABLE public.genres;
       public         heap    postgres    false            �            1259    17642    genres_id_seq    SEQUENCE     �   CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.genres_id_seq;
       public          postgres    false    220            1           0    0    genres_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;
          public          postgres    false    219            �            1259    17661    musics    TABLE     5  CREATE TABLE public.musics (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    genre_id integer NOT NULL,
    author_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    file_path character varying(500),
    image_path character varying(500)
);
    DROP TABLE public.musics;
       public         heap    postgres    false            �            1259    17660    musics_id_seq    SEQUENCE     �   CREATE SEQUENCE public.musics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.musics_id_seq;
       public          postgres    false    224            2           0    0    musics_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.musics_id_seq OWNED BY public.musics.id;
          public          postgres    false    223            �            1259    17608    users    TABLE     G  CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_type character varying(20) DEFAULT 'classic'::character varying NOT NULL
)
PARTITION BY LIST (user_type);
    DROP TABLE public.users;
       public            postgres    false            �            1259    17607    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            3           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            �            1259    17630    users_admin    TABLE     `  CREATE TABLE public.users_admin (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_type character varying(20) DEFAULT 'classic'::character varying NOT NULL
);
    DROP TABLE public.users_admin;
       public         heap    postgres    false    215    216            �            1259    17618    users_classic    TABLE     b  CREATE TABLE public.users_classic (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_type character varying(20) DEFAULT 'classic'::character varying NOT NULL
);
 !   DROP TABLE public.users_classic;
       public         heap    postgres    false    215    216            h           0    0    users_admin    TABLE ATTACH     [   ALTER TABLE ONLY public.users ATTACH PARTITION public.users_admin FOR VALUES IN ('admin');
          public          postgres    false    218    216            g           0    0    users_classic    TABLE ATTACH     _   ALTER TABLE ONLY public.users ATTACH PARTITION public.users_classic FOR VALUES IN ('classic');
          public          postgres    false    217    216            s           2604    17655 
   authors id    DEFAULT     h   ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);
 9   ALTER TABLE public.authors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            r           2604    17646 	   genres id    DEFAULT     f   ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);
 8   ALTER TABLE public.genres ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            t           2604    17664 	   musics id    DEFAULT     f   ALTER TABLE ONLY public.musics ALTER COLUMN id SET DEFAULT nextval('public.musics_id_seq'::regclass);
 8   ALTER TABLE public.musics ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            i           2604    17611    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            '          0    17652    authors 
   TABLE DATA           +   COPY public.authors (id, name) FROM stdin;
    public          postgres    false    222   v9       %          0    17643    genres 
   TABLE DATA           *   COPY public.genres (id, name) FROM stdin;
    public          postgres    false    220   ?:       )          0    17661    musics 
   TABLE DATA           c   COPY public.musics (id, title, genre_id, author_id, created_at, file_path, image_path) FROM stdin;
    public          postgres    false    224   p:       #          0    17630    users_admin 
   TABLE DATA           Q   COPY public.users_admin (id, email, password, created_at, user_type) FROM stdin;
    public          postgres    false    218   U;       "          0    17618    users_classic 
   TABLE DATA           S   COPY public.users_classic (id, email, password, created_at, user_type) FROM stdin;
    public          postgres    false    217   �;       4           0    0    authors_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.authors_id_seq', 14, true);
          public          postgres    false    221            5           0    0    genres_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.genres_id_seq', 3, true);
          public          postgres    false    219            6           0    0    musics_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.musics_id_seq', 10, true);
          public          postgres    false    223            7           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 8, true);
          public          postgres    false    215            �           2606    17659    authors authors_name_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_name_key UNIQUE (name);
 B   ALTER TABLE ONLY public.authors DROP CONSTRAINT authors_name_key;
       public            postgres    false    222            �           2606    17657    authors authors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.authors DROP CONSTRAINT authors_pkey;
       public            postgres    false    222            �           2606    17650    genres genres_name_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_name_key UNIQUE (name);
 @   ALTER TABLE ONLY public.genres DROP CONSTRAINT genres_name_key;
       public            postgres    false    220            �           2606    17648    genres genres_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.genres DROP CONSTRAINT genres_pkey;
       public            postgres    false    220            �           2606    17667    musics musics_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.musics
    ADD CONSTRAINT musics_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.musics DROP CONSTRAINT musics_pkey;
       public            postgres    false    224            w           2606    17617    users users_email_user_type_key 
   CONSTRAINT     f   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_user_type_key UNIQUE (email, user_type);
 I   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_user_type_key;
       public            postgres    false    216    216                       2606    17639 +   users_admin users_admin_email_user_type_key 
   CONSTRAINT     r   ALTER TABLE ONLY public.users_admin
    ADD CONSTRAINT users_admin_email_user_type_key UNIQUE (email, user_type);
 U   ALTER TABLE ONLY public.users_admin DROP CONSTRAINT users_admin_email_user_type_key;
       public            postgres    false    218    4727    218    218            y           2606    17615    users users_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id, user_type);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216    216            �           2606    17637    users_admin users_admin_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.users_admin
    ADD CONSTRAINT users_admin_pkey PRIMARY KEY (id, user_type);
 F   ALTER TABLE ONLY public.users_admin DROP CONSTRAINT users_admin_pkey;
       public            postgres    false    218    218    4729    218            {           2606    17627 /   users_classic users_classic_email_user_type_key 
   CONSTRAINT     v   ALTER TABLE ONLY public.users_classic
    ADD CONSTRAINT users_classic_email_user_type_key UNIQUE (email, user_type);
 Y   ALTER TABLE ONLY public.users_classic DROP CONSTRAINT users_classic_email_user_type_key;
       public            postgres    false    217    217    217    4727            }           2606    17625     users_classic users_classic_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.users_classic
    ADD CONSTRAINT users_classic_pkey PRIMARY KEY (id, user_type);
 J   ALTER TABLE ONLY public.users_classic DROP CONSTRAINT users_classic_pkey;
       public            postgres    false    217    217    217    4729            �           0    0    users_admin_email_user_type_key    INDEX ATTACH     f   ALTER INDEX public.users_email_user_type_key ATTACH PARTITION public.users_admin_email_user_type_key;
          public          postgres    false    218    4727    4735    4727    218    216            �           0    0    users_admin_pkey    INDEX ATTACH     H   ALTER INDEX public.users_pkey ATTACH PARTITION public.users_admin_pkey;
          public          postgres    false    4737    4729    218    4729    218    216            �           0    0 !   users_classic_email_user_type_key    INDEX ATTACH     h   ALTER INDEX public.users_email_user_type_key ATTACH PARTITION public.users_classic_email_user_type_key;
          public          postgres    false    4731    4727    217    4727    217    216            �           0    0    users_classic_pkey    INDEX ATTACH     J   ALTER INDEX public.users_pkey ATTACH PARTITION public.users_classic_pkey;
          public          postgres    false    217    4729    4733    4729    217    216            �           2606    17673    musics musics_author_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.musics
    ADD CONSTRAINT musics_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.musics DROP CONSTRAINT musics_author_id_fkey;
       public          postgres    false    222    224    4745            �           2606    17668    musics musics_genre_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.musics
    ADD CONSTRAINT musics_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.musics DROP CONSTRAINT musics_genre_id_fkey;
       public          postgres    false    4741    224    220            '   �   x���n�@@ѵ����	��%�%"�cӍI,bɓ���wX^���힚��:��J떥�����qi����G�����d�]R��9T�D3���B�����Ղ?��6TƗ
.a�ҷLg�wj&p���Q�2B�n���oq�|UZ;_�%�|h�B[}��v�R�v��B��|C�      %   !   x�3��/�2��O��2��J������� P��      )   �   x�]��j�0���S�,t��r֘YR�t�b�h]l98%ϟ��j��|�B��Y�qL �%�Xl0����6�L���z�^�� ]N�y���^�Ae��a�Ȣ�b%�n-���\w�@���^�%$��u�L^���4閖��_��đ�`@b��������9�_�6x�p.�3�bቕo<��-�iT��e��D
Ԝ��Z�ץ�OSU�~xe�      #   x   x�3�LL���sH�H�-�I�K���T1�T14P��7�tϯ*uN�*,ώ
��
�ԳI1JrLN�rK�N����K.�u5�Lv6+q��4202�50�54U0��25"=Kc3�E\1z\\\ �m"f      "   '  x�m�Ko�@ �3�����]����#��H���&͊+ ��)⯯'bl�9N�K)M%ʉ��,Od�D����'�U���`���!"/����XS%H�8P5�U�gh����9�z%o��_�6ٿG�m�'<|�����o�e��л���t�=�:5H�P�zV�Y��+=O�hmߜ����,�!V_���g�������}�"qf��bh�B��.Q:��Z6�����GՅ{m�`N��l{~�R*¥��˲`k C����D��Y�1���Uj���LCdԫ�@U�_�
�n     