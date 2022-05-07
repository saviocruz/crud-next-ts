SELECT json_object('id' VALUE id,
                   'nome' VALUE nome,
                   'ativo' VALUE ativo,
                   'criado_em' VALUE '"' || '01/01/2020' || '"' FORMAT JSON) || ','
  FROM acessoweb.adm_dominio
 order by id;

SELECT json_object('id' VALUE id,
                   'id_dominio' VALUE id_dominio,
                   'nome' VALUE nome,
                   'descricao' VALUE descricao,
                   'ativo' VALUE ativo,
                   'tipo' VALUE tipo,
                   
                   'informacao' VALUE informacao,
                   'legenda' VALUE legenda,
                   'tamanho' VALUE tamanho,
                   
                   'criado_em' VALUE '"' || '01/01/2020' || '"' FORMAT JSON) || ','
  FROM acessoweb.adm_dominio_item
 order by id
 
 SELECT json_object('id' VALUE id,
                   'id_dominio_item' VALUE id_dominio_item,
                   'nome' VALUE nome,
                   'tipo_form' VALUE tipo_form,
                   'valor' VALUE valor,
                   'id_dominio_dicionario' VALUE id_dominio_dicion,
                   'criado_em' VALUE '"' || '01/01/2020' || '"' FORMAT JSON) || ','
  FROM acessoweb.adm_dominio_item_valor
 order by id


SELECT json_object('id' VALUE id,
                   'id_dominio' VALUE id_dominio,
                   'nome' VALUE nome,
                   'descricao' VALUE descricao,
                   'ativo' VALUE ativo,
                   'tipo' VALUE tipo,
                   
                   'informacao' VALUE informacao,
                   'legenda' VALUE legenda,
                   'tamanho' VALUE tamanho,
                   
                   'criado_em' VALUE '"' || '01/01/2020' || '"' FORMAT JSON) || ','
  FROM acessoweb.adm_dominio_dicion
 order by id