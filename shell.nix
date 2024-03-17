{pkgs ? import <nixpkgs> {}}:

with pkgs;

mkShell {
  name = "rinha";
  buildInputs = [ readline go postgresql ];
  shellHook = ''
  rm -r .postgres
  export PGHOSTADDR=127.0.0.1
    export PGHOST=$PWD/.postgres
export PGDATA=$PGHOST/data
export PGLOG=$PGHOST/postgres.log
export PGPASSWORD=postgres
export PGDATABASE=root 

if [ ! -d $PGDATA ]; then
  echo 'Initializing postgresql database...'
  initdb --auth=trust --no-locale --encoding=UTF8 >/dev/null
fi

# inicializando o servidor
pg_ctl start -l $PGLOG -o "--unix_socket_directories='$PGHOST'"

# verifica se existe um usuário padrão, caso contrário ele é criado
psql -d postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='postgres'" | grep -q 1 \
  || createuser -s postgres



psql -lqt | cut -d \| -f 1 | grep -wq "root" \
  || createdb root
# assim que você sair do ambiente criado pelo `nix-shell`
# o servidor do postgres será desligado
finish() {
  pg_ctl -D $PGDATA stop
}

psql -d root -a -f init.sql
trap finish EXIT
  '';
}