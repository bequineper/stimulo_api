import db from '../db.js';

export async function createPackage(req,res) {
    const {name} = req.body;
    const user_id = req.user.id;

  try {
    const [id] = await db('package').insert({ name, user_id });
    res.status(201).json({ id, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar pacote' });
  }
}

export async function listPackages(req, res) {
  const user_id = req.user.id;

  try {
    const packages = await db('package')
      .where({ user_id })
      .select('id', 'name');
    res.status(200).json({ packages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar pacotes' });
  }
}

export async function getPackageFiles(req, res) {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const pacote = await db('package')
      .where({ id, user_id })
      .first();

    if (!pacote) {
      return res.status(404).json({ message: 'Pacote não encontrado' });
    }

    const files = await db('package_has_file as pf')
      .join('file as f', 'f.id', 'pf.file_id')
      .where('pf.package_id', id)
      .select('f.id', 'f.name');

    res.status(200).json({ ...pacote, files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar pacote' });
  }
}

export async function updatePackageName(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const user_id = req.user.id;

  try {
    const updated = await db('package')
      .where({ id, user_id })
      .update({ name });

    if (!updated) {
      return res.status(404).json({ message: 'Pacote não encontrado' });
    }

    res.status(200).json({ message: 'Nome do pacote atualizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar nome do pacote' });
  }
}

export async function deletePackage(req, res) {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    await db('package_has_file').where('package_id', id).del();
    const deleted = await db('package')
      .where({ id, user_id })
      .del();

    if (!deleted) {
      return res.status(404).json({ message: 'Pacote não encontrado' });
    }

    res.status(200).json({ message: 'Pacote deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar pacote' });
  }
}

export async function addFilesToPackage(req, res) {
  const { id } = req.params; // package_id
  const { file_ids } = req.body;
  const user_id = req.user.id;

  try {
    const pacote = await db('package')
      .where({ id, user_id })
      .first();

    if (!pacote) {
      return res.status(404).json({ message: 'Pacote não encontrado' });
    }

    const inserts = file_ids.map(file_id => ({
      package_id: id,
      file_id
    }));

    await db('package_has_file').insert(inserts);

    res.status(201).json({ message: 'Arquivos adicionados ao pacote' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar arquivos ao pacote' });
  }
}

export async function removeFileFromPackage(req, res) {
  const { id, fileId } = req.params;
  const user_id = req.user.id;

  try {
    const pacote = await db('package')
      .where({ id, user_id })
      .first();

    if (!pacote) {
      return res.status(404).json({ message: 'Pacote não encontrado' });
    }

    const removed = await db('package_has_file')
      .where({ package_id: id, file_id: fileId })
      .del();

    if (!removed) {
      return res.status(404).json({ message: 'Arquivo não está neste pacote' });
    }

    res.status(200).json({ message: 'Arquivo removido do pacote' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao remover arquivo do pacote' });
  }
}


